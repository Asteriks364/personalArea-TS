import * as React from 'react';
import { Form, Input, Button, Alert } from 'antd';

import { useAuth } from '../AppProviders/Providers/AuthProvider/AuthProvider';

import './LoginForm.css';

export const LoginForm = (): JSX.Element => {
  const authContext = useAuth();
  const { login } = authContext;

  const [errorMessage, setErrorMessage] = React.useState(undefined as string | undefined);
  const [loading, setLoading] = React.useState(false as boolean);

  const onFinish = React.useCallback(
    async (values: any) => {
      setErrorMessage(undefined);
      setLoading(true);

      if (!(await login(values.userName, values.password))) {
        setErrorMessage('Неверное имя пользователя или пароль.');
        setLoading(false);
      }
    },
    [login],
  );

  const onFinishFailed = React.useCallback(() => {
    setErrorMessage(undefined);
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

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
      {errorMessage === undefined ? undefined : (
        <Alert className="login-form__alert" message={errorMessage} type="error" showIcon={true} />
      )}
    </div>
  );
};
