const tap = require('tap')
const coinTicketParser = require('./coinTicketParser')

tap.test('coinTicketParser', t => {
  tap.test('should extract receiver and value', t => {
    /*
    [
  {
    "receiver": "cristiano.giulioni",
    "sender": "sergiy.nepop",
    "amount": 1,
    "id": "fb48bbc1-c367-44a2-93ac-f80954f1a84b",
    "sentTime": 1642781930
  },
  {
    "receiver": "davide.cendron135",
    "sender": "micheleluconi",
    "amount": 5,
    "id": "81e6b7c5-3e54-40f9-a95c-27d31762a890",
    "sentTime": 1643184849
  },
  {
    "receiver": "roberto.lombi947",
    "sender": "patrick.fazzi",
    "amount": 1,
    "id": "361e3891-86f8-42af-8141-d2e5ac7a7007",
    "sentTime": 1642766497
  },
  {
    "receiver": "giorgio.boa",
    "sender": "patrick.fazzi",
    "amount": 5,
    "id": "b044acf0-bc81-4389-bf4c-f578fd6fa9a8",
    "sentTime": 1642093800
  },
  {
    "receiver": "patrick.fazzi",
    "sender": "diego.ceccacci",
    "amount": 1,
    "id": "d8086253-2275-4eed-b9a2-22dc6c951a91",
    "sentTime": 1641381259
  },
  {
    "receiver": "luca.ferri",
    "sender": "diego.ceccacci",
    "amount": 1,
    "id": "11067325-b788-4543-9efb-16e930019536",
    "sentTime": 1643277313
  },
  {
    "receiver": "kea",
    "sender": "daniele.rastelli",
    "amount": 1,
    "id": "b53cf348-6c85-4972-90aa-2a6d2edbeda9",
    "sentTime": 1642773357
  },
  {
    "receiver": "silvia.podesta",
    "sender": "enrico",
    "amount": 1,
    "id": "7494063e-8f21-4a65-a6f9-b7fabc08419f",
    "sentTime": 1641220260
  },
  {
    "receiver": "adellava",
    "sender": "domenico.cardillo",
    "amount": 1,
    "id": "80cf6b38-24ca-4361-b7c4-1ca7eeaa7f08",
    "sentTime": 1642189695
  },
  {
    "receiver": "ramonavesprini",
    "sender": "davide.cendron135",
    "amount": 1,
    "id": "e4fed4cb-25e3-45ec-846e-c6de4abce3d1",
    "sentTime": 1642782291
  },
  {
    "receiver": "cristiano.giulioni",
    "sender": "francesco-strazzullo",
    "amount": 1,
    "id": "353de855-1d7c-4737-b9fa-3584069affc7",
    "sentTime": 1642585875
  },
  {
    "receiver": "diego.ceccacci",
    "sender": "patrick.fazzi",
    "amount": 1,
    "id": "24437820-3a39-4326-af8e-82b332467193",
    "sentTime": 1642005090
  },
  {
    "receiver": "giorgio.boa",
    "sender": "luca.nicolini",
    "amount": 1,
    "id": "453c5112-41ec-49e7-9231-46860469a218",
    "sentTime": 1642780618
  },
  {
    "receiver": "davide.cendron135",
    "sender": "massimo.biagioli",
    "amount": 1,
    "id": "1ebbff69-61b4-4b16-9c07-09674bc7a7d8",
    "sentTime": 1641568553
  },
  {
    "receiver": "gerson.enriquez665",
    "sender": "sergiy.nepop",
    "amount": 1,
    "id": "27b48639-5029-43d4-a000-5b07079b36c0",
    "sentTime": 1642781943
  },
  {
    "receiver": "nandoluc",
    "sender": "luca.delpuppo",
    "amount": 1,
    "id": "4670da71-0e5c-458d-9d94-54e88fef7396",
    "sentTime": 1642838771
  },
  {
    "receiver": "adellava",
    "sender": "enrico",
    "amount": 1,
    "id": "d840e789-b328-4340-9dd5-0a4875b161c2",
    "sentTime": 1641220260
  },
  {
    "receiver": "giorgio.boa",
    "sender": "sergiy.nepop",
    "amount": 1,
    "id": "18a33ef8-d6dc-4596-a0c6-814fb199eb15",
    "sentTime": 1642781884
  },
  {
    "receiver": "luca.delpuppo",
    "sender": "diego.ceccacci",
    "amount": 1,
    "id": "b232d8e4-65e5-472a-9865-0ff21dc1e100",
    "sentTime": 1641831197
  },
  {
    "receiver": "sergiy.nepop",
    "sender": "cristiano.giulioni",
    "amount": 1,
    "id": "c4f6ff50-2f3c-48bb-96af-5d448d0bb02e",
    "sentTime": 1642775020
  },
  {
    "receiver": "g.mandolini",
    "sender": "francesco-strazzullo",
    "amount": 1,
    "id": "cb4a8f0c-b050-42c7-809e-78cf14dd6cae",
    "sentTime": 1642766220
  },
  {
    "receiver": "adellava",
    "sender": "francesco-strazzullo",
    "amount": 1,
    "id": "1295a05d-4b1d-40b5-9dfe-026b1677d109",
    "sentTime": 1641985494
  },
  {
    "receiver": "marco.sbolgi",
    "sender": "diego.ceccacci",
    "amount": 1,
    "id": "09de04c3-ab53-42d6-9ca7-2b38199fd198",
    "sentTime": 1641997331
  },
  {
    "receiver": "enrico",
    "sender": "francesco-strazzullo",
    "amount": 1,
    "id": "fb682193-b89e-4405-ac8e-ea71dc8836e7",
    "sentTime": 1642065035
  },
  {
    "receiver": "tiziano.fogli",
    "sender": "massimo.biagioli",
    "amount": 1,
    "id": "71593a96-18d8-4012-a653-bd1219db6f65",
    "sentTime": 1641568507
  },
  {
    "receiver": "cristiano.giulioni",
    "sender": "sergiy.nepop",
    "amount": 2,
    "id": "7fdd87dc-b179-4e70-8004-9d5194ee08cd",
    "sentTime": 1642774283
  },
  {
    "receiver": "simone.ferraro",
    "sender": "micheleluconi",
    "amount": 5,
    "id": "ba2bfe2e-7a2e-4b86-a4dc-e3e4039e7a3c",
    "sentTime": 1643184869
  },
  {
    "receiver": "patrick.fazzi",
    "sender": "daniele.rastelli",
    "amount": 1,
    "id": "2e41e3db-c3ca-4017-9ea2-8623010b98a2",
    "sentTime": 1642773552
  },
  {
    "receiver": "daniele.rastelli",
    "sender": "sergiy.nepop",
    "amount": 1,
    "id": "4c313881-a490-4e2c-aa41-bff3ef1380b9",
    "sentTime": 1642774330
  },
  {
    "receiver": "francesco-strazzullo",
    "sender": "giorgio.boa",
    "amount": 3,
    "id": "854dc07c-0f9a-4c72-a85a-0e2bdbd15f75",
    "sentTime": 1643012762
  },
  {
    "receiver": "alessandro.grande",
    "sender": "micheleluconi",
    "amount": 3,
    "id": "d3835432-79b3-49e6-8c94-69101dc1b234",
    "sentTime": 1643100245
  }
]
    */
    const data = [
      {
        receiver: 'alessandro.grande',
        sender: 'micheleluconi',
        amount: 3
      },
      {
        receiver: 'daniele.rastelli',
        sender: 'sergiy.nepop',
        amount: 1
      }
    ]

    const result = coinTicketParser(data)

    t.match(result, [
      {
        receiver: 'alessandro.grande',
        sender: 'micheleluconi'
      },
      {
        receiver: 'alessandro.grande',
        sender: 'micheleluconi'
      },
      {
        receiver: 'alessandro.grande',
        sender: 'micheleluconi'
      },
      {
        receiver: 'daniele.rastelli',
        sender: 'sergiy.nepop'
      }
    ])

    t.end()
  })

  t.end()
})
