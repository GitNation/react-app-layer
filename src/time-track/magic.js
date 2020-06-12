export const mergeSchedule = (schedule) => {
  const mSchedule = [
    {
      tab: 'Talks',
      title: 'Talks',
      list: [...schedule[0].list, ...schedule[1].list],
    },
  ];
  return mSchedule;
};
