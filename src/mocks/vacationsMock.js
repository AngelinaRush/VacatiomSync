const vacationsMock = {
  1: [
    {
      member: 'ffgd@gmail.com',
      vacations: [
        { id: +new Date(), start: +new Date('2023-03-10'), end: +new Date('2023-04-20') },
        { id: +new Date(), start: +new Date('2023-08-15'), end: +new Date('2023-08-29') },
      ],
    },
    {
      member: 'Bob@gmail.com',
      vacations: [
        { id: +new Date(), start: +new Date('2023-08-01'), end: +new Date('2023-08-20') },
        { id: +new Date(), start: +new Date('2023-06-10'), end: +new Date('2023-07-20') },
      ],
    },
    {
      member: 'Charlie@gmail.com',
      vacations: [{ id: +new Date(), start: +new Date('2023-07-15'), end: +new Date('2023-07-20') }],
    },
  ],
}

export default vacationsMock
