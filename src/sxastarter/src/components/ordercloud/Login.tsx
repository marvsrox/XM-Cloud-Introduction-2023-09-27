import React from 'react';
import { Field, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import login from '../../redux/ocAuth/login';
import { useOcDispatch, useOcSelector } from '../../redux/ocStore';
import {
  Button,
  VStack,
  HStack,
  Input,
  Box,
  Flex,
  Card,
  CardBody,
  Link,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Fields {
  Title: Field<string>;
  UserName: Field<string>;
  Password: Field<string>;
  UserNameWaterMark: Field<string>;
  PasswordWaterMark: Field<string>;
  ErrorMessage: Field<string>;
  StaySignedInMessage: Field<string>;
  RegisterMessage: Field<string>;
  SubmitButton: LinkField;
}

type LoginProps = {
  params: { [key: string]: string };
  fields: Fields;
  onLoggedIn: () => void;
};

export const Default = (props: LoginProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const router = useRouter();

  const dispatch = useOcDispatch();

  const { loading, error, isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
    error: s.ocAuth.error,
    loading: s.ocAuth.loading,
  }));

  const [formValues, setFormValues] = useState({
    identifier: '',
    password: '',
    remember: false,
  });

  const handleInputChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: e.target.value }));
  };

  const handleCheckboxChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: !!e.target.checked }));
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        login({
          username: formValues.identifier,
          password: formValues.password,
          remember: formValues.remember,
        })
      );
    },
    [formValues, dispatch]
  );

  useEffect(() => {
    if (!isAnonymous) {
      router.push('/');
    }
  }, [router, isAnonymous]);

  return (
    <Flex as="form" name="ocLoginForm" onSubmit={handleSubmit} justifyContent="center">
      <Card variant="filled" padding={4}>
        <CardBody>
          <VStack minWidth="400px" className={`component container ${styles}`} gap={5}>
            {props.fields.Title && (
              <Box width="full" w="100%" textAlign="left">
                <Heading>
                  <RichText field={props.fields.Title} />
                </Heading>
              </Box>
            )}
            {error && <p>{props.fields.ErrorMessage.value}</p>}
            <Box w="100%" width="full">
              {props.fields.UserName && (
                <Box width="full" w="100%" textAlign="left" pl="10px" pb="10px">
                  <RichText field={props.fields.UserName} />
                </Box>
              )}
              <Input
                type="text"
                id="identifier"
                name="identifier"
                placeholder={props.fields.UserNameWaterMark.value}
                value={formValues.identifier}
                onChange={handleInputChange('identifier')}
                required
                size="md"
              />
            </Box>
            <Box w="100%" width="full">
              {props.fields.Password && (
                <Box width="full" w="100%" textAlign="left" pl="10px" pb="10px">
                  <RichText field={props.fields.Password} />
                </Box>
              )}
              <Input
                type="password"
                id="password"
                name="password"
                placeholder={props.fields.PasswordWaterMark.value}
                value={formValues.password}
                onChange={handleInputChange('password')}
                required
                size="md"
              />
            </Box>

            <Box w="100%" width="full">
              <HStack>
                <Input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formValues.remember}
                  onChange={handleCheckboxChange('remember')}
                  size="md"
                  width="32px"
                  height="32px"
                />
                {props.fields.StaySignedInMessage && (
                  <Box width="full" w="100%" textAlign="left" pl="10px">
                    <RichText field={props.fields.StaySignedInMessage} />
                  </Box>
                )}
              </HStack>
            </Box>
            {props?.fields?.SubmitButton?.value?.href && (
              <Link
                href={props?.fields?.SubmitButton?.value?.href}
                title={props?.fields?.SubmitButton?.value?.title}
              >
                <Button
                  disabled={loading}
                  type="submit"
                  bgColor="brand.500"
                  color="white"
                  ml="20px"
                  w="100%"
                  width="full"
                  variant={props?.fields?.SubmitButton?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.SubmitButton?.value?.text}
                </Button>
              </Link>
            )}
            {props.fields.RegisterMessage && (
              <Box width="full" w="100%" textAlign="left" pl="10px">
                <RichText field={props.fields.RegisterMessage} />
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};
