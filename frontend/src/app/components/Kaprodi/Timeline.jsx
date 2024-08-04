import React from "react";

function Timeline() {
  const timelineData = [
    { date: "8 November 2021", title: "Set Jadwal Sidang", description: "79 Orang belum melakukan sidang", status: 'belum' },
    { date: "8 November 2021", title: "Set Jadwal Sidang", description: "79 Orang belum melakukan sidang", status: 'sudah' },
    { date: "8 November 2021", title: "Set Jadwal Sidang", description: "79 Orang belum melakukan sidang", status: 'belum' },
    { date: "8 November 2021", title: "Set Jadwal Sidang", description: "79 Orang belum melakukan sidang", status: 'sudah' },
  ];

  return (
    <>
      <div className="w-full flex gap-8 flex-wrap">
        {timelineData.map((data, index) => (
          <div key={index} className={`p-3 h-[12em] w-[12em] ${data.status === 'belum' ? 'bg-red-400' : 'bg-green-400'} rounded-2xl shadow-xl`}>
            <h1>{data.date}</h1>
            <br />
            <h1 className="font-bold">{data.title}</h1>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Timeline;
