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
    return Promise.all(toArray(to).map(from => singleAdd({ from, to, amount })))
  }

  const countBySender = async from => {
    return coins.filter(coin => coin.from === from).length
  }

  return {
    add,
    countBySender
  }
}

export default create()
