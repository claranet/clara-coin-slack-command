import { v4 as uuidv4 } from 'uuid'

const unixTimestamp = () => Math.floor(Date.now() / 1000)

const toArray = (maybeArray = []) => Array.isArray(maybeArray) ? maybeArray : [maybeArray]

const create = () => {
  const coins = []

  const singleAdd = async ({ from, to, amount = 1 }) => {
    const coin = {
      from,
      to,
      amount,
      id: uuidv4(),
      timestamp: unixTimestamp()
    }
    coins.push(coin)
    return coin
  }

  const add = ({ from, to, amount = 1 }) => {
    return Promise.all(toArray(to).map(_to => singleAdd({ from, to: _to, amount })))
  }

  const countBySender = async from => {
    return coins.filter(coin => coin.from === from).length
  }

  const sent = async from => {
    return coins.filter(coin => coin.from === from).reduce((acc, coin) => {
      acc[coin.to] = (acc[coin.to] || 0) + coin.amount
      return acc
    }, {})
  }

  const received = async to => {
    return coins.filter(coin => coin.to === to).reduce((acc, coin) => {
      acc[coin.from] = (acc[coin.from] || 0) + coin.amount
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

export default create()
