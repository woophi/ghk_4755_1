import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import { useEffect, useState } from 'react';
import bulp from './assets/bulp.png';
import card from './assets/card.png';
import cash from './assets/cash.png';
import chat from './assets/chat.png';
import check from './assets/check.png';
import hb from './assets/hb.png';
import percent from './assets/percent.png';
import revert from './assets/revert.png';
import uno from './assets/uno.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const data = [
  {
    title: 'Комиссии до 1% на переводы за границу (Узбекистан, Кыргызстан и др.)',
    img: revert,
  },
  {
    title: 'Подписка на сервис помощи иностранцам: легализация, аренда, РВП, ВНЖ',
    img: bulp,
  },
  {
    title: 'Общение с банком на родном языке (чат или бот)',
    img: chat,
  },
  {
    title: 'Кэшбэк до 30% на 3 категории и у партнёров банка',
    img: card,
  },
  {
    title: 'Накопительные счета с повышенным процентом',
    img: percent,
  },
  {
    title: 'Альфа-Чек — бесплатные СМС-уведомления',
    img: check,
  },
  {
    title: 'Бесплатное снятие денег в любых банкоматах',
    img: cash,
  },
  {
    title: 'Бесплатные переводы по СБП до 100 000 ₽',
    img: uno,
  },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    if (!checkedItems.length) {
      setError('Выберите от 1 преимущества, для расчёта условий');
      return;
    }
    setLoading(true);

    sendDataToGA({
      advantages_list: checkedItems.join(';'),
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <img src={hb} alt="hb" width="100%" height={226} className={appSt.img} />
        <Typography.TitleResponsive tag="h1" view="large" font="system" weight="semibold" style={{ textAlign: 'center' }}>
          Зарплатная карта для иностранных граждан
        </Typography.TitleResponsive>
        <Typography.Text view="primary-medium" style={{ textAlign: 'center' }}>
          Переводите зарплату в Альфа-Банк и пользуйтесь преимуществами
        </Typography.Text>
      </div>
      <div className={appSt.containerItems}>
        <Typography.TitleResponsive
          tag="h2"
          view="large"
          font="system"
          weight="semibold"
          style={{ textAlign: 'center', marginTop: '1rem' }}
        >
          Ваши преимущества
        </Typography.TitleResponsive>
        <Typography.Text view="primary-medium" style={{ textAlign: 'center' }}>
          Выберите от 1 преимущества, для расчёта условий
        </Typography.Text>

        <div />

        {data.map((item, index) => (
          <div
            key={index}
            className={appSt.box}
            onClick={e => {
              e.preventDefault();
              setCheckedItems(prev =>
                prev.includes(item.title) ? prev.filter(i => i !== item.title) : [...prev, item.title],
              );
            }}
          >
            <img src={item.img} alt={item.title} width={48} height={48} />
            <Typography.Text
              view="primary-medium"
              style={{
                color: '#0B1F35B2',
              }}
            >
              {item.title}
            </Typography.Text>

            <Checkbox size={24} checked={checkedItems.includes(item.title)} />
          </div>
        ))}

        <Gap size={96} />
      </div>

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="accent" onClick={submit} hint={err} shape="rectangular">
          Оформить
        </ButtonMobile>
      </div>
    </>
  );
};
