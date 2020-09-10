import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './LoginForm.css';

export const LoginForm = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false as boolean);

  const onFinish = React.useCallback((values) => {
    console.log('Success:', values);
  }, []);

  const onFinishFailed = React.useCallback((errorInfo) => {
    console.log('Failed:', errorInfo);
  }, []);

  return (
    <div className="login-form">
      <Form name="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="login-form__inputs-block">
          <Form.Item name="userName" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input size="large" placeholder="Логин" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password size="large" placeholder="Пароль" />
          </Form.Item>
        </div>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Запоминь меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
