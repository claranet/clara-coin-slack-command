import { v4 as uuidv4 } from 'uuid'
import AWS from 'aws-sdk'
import { config } from '../model/config.js'

const unixTimestamp = () => Math.floor(Date.now() / 1000)

const toArray = (maybeArray = []) => Array.isArray(maybeArray) ? maybeArray : [maybeArray]

const create = (dynamoDatabase) => {
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

    await dynamoDatabase.put(coinInfo).promise()

    return coin
  }

  const add = (entity) => {
    const { sender, receiver, amount = 1, message = '' } = entity
    return Promise.all(toArray(receiver).map(_to => singleAdd({ sender, receiver: _to, amount, message })))
  }

  const listAll = () => new Promise((resolve, reject) => {
    const parameters = {
      TableName: process.env.COINS_TABLE,
      ProjectionExpression: 'id, sentTime, sender, receiver, amount, message'
    }

    const onScan = (error, data) => {
      if (error) {
        console.log('Scan failed to load data. Error JSON:', JSON.stringify(error, undefined, 2))
        reject(error)
      } else {
        console.log('Scan succeeded.')
        resolve(data.Items)
      }
    }

    dynamoDatabase.scan(parameters, onScan)
  })

  const countBySender = async sender => {
    const coins = await listAll()
    // eslint-disable-next-line unicorn/no-array-reduce
    return coins.filter(coin => coin.sender === sender).reduce((sum, coin) => sum + coin.amount, 0)
  }

  const remainingCoins = async sender => {
    const sent = await countBySender(sender)
    return config.TOTAL_COINS - sent
  }

  const sent = async sender => {
    const coins = await listAll()
    // eslint-disable-next-line unicorn/no-array-reduce
    return coins.filter(coin => coin.sender === sender).reduce((accumulator, coin) => {
      accumulator[coin.receiver] = (accumulator[coin.receiver] || 0) + coin.amount
      return accumulator
    }, {})
  }

  const received = async receiver => {
    const coins = await listCoinReceivedBy(receiver)
    // eslint-disable-next-line unicorn/no-array-reduce
    return coins.reduce((accumulator, coin) => {
      accumulator[coin.sender] = (accumulator[coin.sender] || 0) + coin.amount
      return accumulator
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

export const coinRepository = create(new AWS.DynamoDB.DocumentClient())
