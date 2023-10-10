const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
const config = require('../model/config')

const unixTimestamp = () => Math.floor(Date.now() / 1000)

const toArray = (maybeArray = []) => Array.isArray(maybeArray) ? maybeArray : [maybeArray]

const create = (dynamoDb) => {
  const singleAdd = async ({ sender, receiver, amount = 1, message = '' }) => {
    const timestamp = unixTimestamp()
    const coin = {
      sender,
      receiver,
      amount,
      id: uuidv4(),
      timestamp,
      sentTime: timestamp,
      message
    }

    console.log('saving coin', coin)

    const coinInfo = {
      TableName: process.env.COINS_TABLE,
      Item: coin
    }

    await dynamoDb.put(coinInfo).promise()

    return coin
  }

  const add = (entity) => {
    const { sender, receiver, amount = 1, message = '' } = entity
    return Promise.all(toArray(receiver).map(_to => singleAdd({ sender, receiver: _to, amount, message })))
  }

  const listAll = () => new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.COINS_TABLE,
      ProjectionExpression: 'id, sentTime, sender, receiver, amount, message'
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
    return coins.filter(coin => coin.sender === sender).reduce((sum, coin) => sum + coin.amount, 0)
  }

  const remainingCoins = async sender => {
    const sent = await countBySender(sender)
    return config.TOTAL_COINS - sent
  }

  const sent = async sender => {
    const coins = await listAll()
    return coins.filter(coin => coin.sender === sender).reduce((acc, coin) => {
      acc[coin.receiver] = (acc[coin.receiver] || 0) + coin.amount
      return acc
    }, {})
  }

  const received = async receiver => {
    const coins = await listCoinReceivedBy(receiver)
    return coins.reduce((acc, coin) => {
      acc[coin.sender] = (acc[coin.sender] || 0) + coin.amount
      return acc
    }, {})
  }

  const listCoinReceivedBy = async receiver => {
    const coins = await listAll()
    return coins.filter(coin => coin.receiver === receiver)
  }

  return {
    listCoinReceivedBy,
    listAll,
    add,
    countBySender,
    remainingCoins,
    sent,
    received
  }
}

module.exports = create(new AWS.DynamoDB.DocumentClient())
