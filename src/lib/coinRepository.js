const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')

AWS.config.setPromisesDependency(require('bluebird'))

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const unixTimestamp = () => Math.floor(Date.now() / 1000)

const toArray = (maybeArray = []) => Array.isArray(maybeArray) ? maybeArray : [maybeArray]

const create = () => {
  const singleAdd = async ({ sender, receiver, amount = 1 }) => {
    const timestamp = unixTimestamp()
    const coin = {
      sender,
      receiver,
      amount,
      id: uuidv4(),
      timestamp,
      sentTime: timestamp
    }

    const coinInfo = {
      TableName: process.env.COINS_TABLE,
      Item: coin
    }

    await dynamoDb.put(coinInfo).promise()

    return coin
  }

  const add = ({ sender, receiver, amount = 1 }) => {
    return Promise.all(toArray(receiver).map(_to => singleAdd({ sender, receiver: _to, amount })))
  }

  const listAll = () => new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.COINS_TABLE,
      ProjectionExpression: 'id, sentTime, sender, receiver, amount'
    }

    const onScan = (err, data) => {
      if (err) {
        console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2))
        reject(err)
      } else {
        console.log('Scan succeeded.')
        resolve(data.Items)
      }
    }

    dynamoDb.scan(params, onScan)
  })

  const countBySender = async sender => {
    const coins = await listAll()
    return coins.filter(coin => coin.sender === sender).length
  }

  const sent = async sender => {
    const coins = await listAll()
    return coins.filter(coin => coin.sender === sender).reduce((acc, coin) => {
      acc[coin.receiver] = (acc[coin.receiver] || 0) + coin.amount
      return acc
    }, {})
  }

  const received = async receiver => {
    const coins = await listAll()
    return coins.filter(coin => coin.receiver === receiver).reduce((acc, coin) => {
      acc[coin.sender] = (acc[coin.sender] || 0) + coin.amount
      return acc
    }, {})
  }

  return {
    add,
    countBySender,
    sent,
    received
  }
}

module.exports = create()
