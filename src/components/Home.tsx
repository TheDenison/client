import React from "react";
import "/src/styles/Home.css";

// Определение для контейнера сетки с необязательным заголовком
interface DataGridProps {
  header?: string; // Необязательный заголовок для сетки
  data: DataCardProps[];
}

// Определите реквизиты для отдельных карт данных
interface DataCardProps {
  title: string;
  value: string | number;
  details?: string | number;
  description?: string;
  current?: string | number;
  target?: string | number;
}

// Компонент DataCard для отображения отдельных записей данных
const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  details,
  description,
  current,
  target,
}) => {
  return (
    <div className="data-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
      <div className="card-details">
        <p>
          {details} {current}
        </p>
        <p>
          {description} {target}
        </p>
      </div>
    </div>
  );
};

// Компонент DataGrid для отображения коллекции карточек данных с необязательным заголовком
const DataGrid: React.FC<DataGridProps> = ({ header, data }) => {
  return (
    <div className="data-grid">
      {header && <h2 className="grid-header">{header}</h2>}
      <div className="grid-content">
        {data.map((item, index) => (
          <DataCard
            key={index}
            title={item.title}
            value={item.value}
            details={item.details}
            description={item.description}
            current={item.current}
            target={item.target}
          />
        ))}
      </div>
    </div>
  );
};

// Главный компонент для отображения DataGrid с предоставленными данными
const Home: React.FC = () => {
  const dataPrediction = [
    {
      title: "Выполнено",
      value: "21 509 шт.",
      details: "На момент 06.01.2025:",
      current: "17 717 шт.",
      description: "До выполнения:",
      target: "3 792 шт.",
    },
    {
      title: "Выручка",
      value: "75 745 356 руб.",
      details: "На момент 06.01.2025:",
      current: "64 145 127 руб.",
      description: "До выполнения:",
      target: "11 600 229 руб.",
    },
    {
      title: "Выплата продавцу",
      value: "55 527 968 руб.",
      details: "На момент 06.01.2025:",
      current: "45 455 703 руб.",
      description: "До выполнения:",
      target: "10 072 265 руб.",
    },
    {
      title: "Валовая прибыль",
      value: "9 445 878 руб.",
      details: "На момент 06.01.2025:",
      current: "6 375 256 руб.",
      description: "До выполнения:",
      target: "3 070 622 руб.",
    },
    {
      title: "Комиссия",
      value: "7 796 751 руб.",
      details: "На момент 06.01.2025:",
      current: "6 610 488 руб.",
      description: "До выполнения:",
      target: "1 186 263 руб.",
    },
    {
      title: "Стоимость услуг",
      value: "11 847 781 руб.",
      details: "На момент 06.01.2025:",
      current: "10 033 983 руб.",
      description: "До выполнения:",
      target: "1 813 798 руб.",
    },
    {
      title: "Себестоимость",
      value: "42 071 897 руб.",
      details: "На момент 06.01.2025:",
      current: "35 908 007 руб.",
      description: "До выполнения:",
      target: "6 163 890 руб.",
    },
    {
      title: "Маржинальность",
      value: "12,47 %",
      details: "На момент 06.01.2025:",
      current: "10,78 %",
      description: "До выполнения:",
      target: "—",
    },
  ];
  const dataOrders = [
    { title: "Заказано", value: "283 149 878 руб. ", current: "23 351 шт." },

    { title: "Выкуплено", value: "64 145 127 руб.", current: "17 717 шт. " },
    { title: "Не выкуплено", value: "13 119 549 руб.", current: "4 249 шт." },
    { title: "Отмены", value: "5 886 192 руб.", current: "1 385 шт. " },
  ];

  return (
    <div className="home">
      <DataGrid header="Прогнозируемые данные" data={dataPrediction} />
      <DataGrid header="Статистика по заказам" data={dataOrders} />
    </div>
  );
};

export default Home;
