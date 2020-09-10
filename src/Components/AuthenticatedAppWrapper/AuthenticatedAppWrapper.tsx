import * as React from 'react';
import Axios from 'axios';
import { List, Avatar, Button, Skeleton } from 'antd';

import './AuthenticatedAppWrapper.css';

export const AuthenticatedAppWrapper = (): JSX.Element => {
  const [initLoading, setInitLoading] = React.useState(true as boolean);
  const [loading, setLoading] = React.useState(false as boolean);
  const [data, setData] = React.useState([] as Array<any>);
  const [list, setList] = React.useState([] as Array<any>);

  const count = 5;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,picture,nat&noinfo`;

  /* Запись в объект контактов из localStorage */
  React.useEffect(() => {
    const raw = localStorage.getItem('contactList');
    if (raw) {
      setList(JSON.parse(raw));
      setInitLoading(false);
    } else {
      getData((res: { results: any }) => {
        setData(res.results);
        setList(res.results);
        setInitLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* Запись объекта контактов в localStorage */
  React.useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(list));
  }, [list]);

  const getData = (callback: { (res: any): void; (arg0: any): void }) => {
    Axios({
      method: 'get',
      url: fakeDataUrl,
      responseType: 'stream',
    }).then(function (response) {
      console.log(response.data);
      callback(response.data);
    });
  };

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))));

    getData((res: { results: any }) => {
      setList(data.concat(res.results));
      setLoading(false);
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <div className="authenticated-app-wrapper">
      <div className="contacts">
        <h1>Личный кабинет</h1>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.medium} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
