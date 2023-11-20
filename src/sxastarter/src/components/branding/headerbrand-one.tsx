/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  Select,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Form, Formik } from 'formik';
import { HiCheckCircle, HiOutlineCog } from 'react-icons/hi';
import {
  HiChevronDown,
  HiMenu,
  HiOutlineHeart,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
} from 'react-icons/hi';

import CategoryNavigationList from 'components/ordercloud/categories/CategoryNavigationList';
import Cookies from 'universal-cookie';
import NextLink from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { useOcSelector } from 'src/redux/ocStore';
import { InputControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const router = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();
  const color = useColorModeValue('textColor.900', 'textColor.100');

  const { lineItems } = useOcCurrentOrder();
  const { isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
  }));

  const cookies = new Cookies();
  let currentcheckoutflow = '/check-out-points';
  if (cookies.get('currentcheckoutflow') !== null) {
    currentcheckoutflow = cookies.get('currentcheckoutflow');
  }

  useEffect(() => {
    const cookies = new Cookies();
    const checkout_cookie = cookies.get('currentcheckoutflow');
    if (!checkout_cookie) {
      //console.log("Added new cookie")
      cookies.set('currentcheckoutflow', '/check-out-points', {
        path: '/',
      });
    }
  });

  const btnRef = React.useRef();
  // const btnCategoryRef = React.useRef();
  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }
  //const [selectedOption, setSelectedOption] = useState<String>();
  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    //setSelectedOption(value);
    const cookies = new Cookies();
    cookies.set('currentcheckoutflow', value, {
      path: '/',
    });
    //Reload page so the theme takes affect
    window.location.reload();
  };

  function setSubmitting(term: string) {
    router.replace('/search?term=' + term);
  }

  return (
    <VStack
      as="header"
      width="full"
      align="center"
      className={`component container ${styles}`}
      style={backgroundStyle}
      pb="40px"
      background="url(https://www.crackerbarrel.com/dist/cb-brandsite/static/media/028be19801dbe10ad6c5906399812518.028be198.jpg) 0 0 repeat"
      shadow="md"
    >
      <HStack as="section" bg="gray.800" w="100%" p="2">
        <Container maxW="container.xl" color="white" fontWeight="normal">
          <Box position="absolute" right="3px" top="4px">
            <Button ref={btnRef} onClick={onOpen} variant="unstyled">
              <Icon as={HiOutlineCog} fontSize="24px" color="#fff" />
            </Button>
          </Box>
          <HStack justifyContent="space-between">
            <HStack justifyContent="flex-start">
              <HStack mr="2" color="gray.500" pl="160px"></HStack>
              <HStack mr="8"></HStack>
            </HStack>
            <HStack>
              <Placeholder name="header-utility-navigation" rendering={props.rendering} />
            </HStack>
          </HStack>
        </Container>
      </HStack>
      <HStack as="section" w="100%" p="2" maxHeight="100">
        <Container maxW="container.xl" color="white" fontWeight="normal">
          <HStack justifyContent="space-between">
            <Box mr={10} mt="58px">
              <Placeholder name="header-logo" rendering={props.rendering} />
            </Box>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={async (values) => {
                setSubmitting(values.search);
              }}
            >
              {(props) => (
                <Form>
                  <HStack
                    border="1px"
                    borderColor="blackAlpha.300"
                    borderRadius="xl"
                    width="100%"
                    maxWidth="700px"
                    pr="5px"
                    bg="#fff"
                  >
                    <InputControl
                      name="search"
                      inputProps={{
                        placeholder: 'search',
                        border: 'none',
                        height: '30px',
                        color: 'gray.500',
                        background: 'none',
                      }}
                      label=""
                    />

                    <Button
                      mt="0px"
                      pt="10px"
                      pb="10px"
                      pl="20px"
                      pr="20px"
                      bg="brand.500"
                      isLoading={props.isSubmitting}
                      type="submit"
                      color="white"
                      fontSize="x-small"
                      right="-7px"
                    >
                      Search
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
            <HStack justifyContent="flex-end">
              <HStack>
                {!isAnonymous ? (
                  <NextLink href="/logout" passHref>
                    <Link color="gray.800">
                      <HStack>
                        <HiOutlineLockOpen fontSize="36px" color="gray.800" /> Logout
                      </HStack>
                    </Link>
                  </NextLink>
                ) : (
                  <Spacer></Spacer>
                )}
              </HStack>
              <HStack>
                {!isAnonymous ? (
                  <NextLink href="/my-profile" passHref>
                    <Link color="gray.800">
                      <HStack>
                        <HiOutlineUserCircle fontSize="36px" color="gray.800" /> My Profile
                      </HStack>
                    </Link>
                  </NextLink>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link color="gray.800">
                      <HStack>
                        <HiOutlineLockClosed fontSize="36px" color="gray.800" /> Member Sign-In
                      </HStack>
                    </Link>
                  </NextLink>
                )}
              </HStack>
              <NextLink href="/my-profile/my-favorites" passHref>
                <Link color="gray.800">
                  <HStack position="relative">
                    <HiOutlineHeart fontSize="36px" color="gray.800" />
                    <Box height="8px" width="8px" position="absolute" top="24px" left="10px">
                      <IconButton
                        aria-label="Favorite Products"
                        color="brand.500"
                        size="xs"
                        p="2px"
                        pr="4px"
                        pl="4px"
                      >
                        <Text fontSize="16px" color="white">
                          0
                        </Text>
                      </IconButton>
                    </Box>
                  </HStack>
                </Link>
              </NextLink>
              <NextLink href="/shopping-cart" passHref>
                <Link>
                  <HStack position="relative">
                    <IconButton
                      icon={<HiOutlineShoppingBag color="gray.800" />}
                      aria-label="Shopping Cart"
                      variant="link"
                      fontSize="36px"
                      size="lg"
                      color="gray.800"
                    />
                    <Box height="14px" width="14px" position="absolute" top="24px" left="14px">
                      <IconButton
                        aria-label="Items in cart"
                        bgColor="brand.500"
                        color="white"
                        size="xs"
                        p="2px"
                        pr="4px"
                        pl="4px"
                      >
                        <Text fontSize="16px">
                          {lineItems && lineItems.length ? lineItems.length : 0}
                        </Text>
                      </IconButton>
                    </Box>
                    <Box position="absolute" top="3px" left="30px" color="gray.800">
                      {/* <Text>{formatPrice(order.Total)}</Text> */}
                    </Box>
                  </HStack>
                </Link>
              </NextLink>
            </HStack>
          </HStack>
        </Container>
      </HStack>
      <HStack as="section" w="100%" p="2" maxHeight="100" mt="0">
        <Container maxW="container.xl">
          <HStack justifyContent="flex-start" pl="36%">
            <Button
              onClick={onCategoryOpen}
              variant="unstyled"
              rightIcon={<HiChevronDown />}
              leftIcon={<HiMenu />}
              bg="brand.500"
              color="white"
              fontSize="x-small"
              mr="4"
              p="10px"
              rounded="md"
            >
              All Categories
            </Button>
            <HStack width="full" align="center" fontSize="28px" fontWeight="bold" color="brand.500">
              <Placeholder name="header-main-known-navigation" rendering={props.rendering} />
              <Placeholder name="header-main-navigation" rendering={props.rendering} />
            </HStack>
            <HStack justifyContent="flex-end"></HStack>
          </HStack>
        </Container>
      </HStack>
      <Drawer
        isOpen={isCategoryOpen}
        placement="left"
        onClose={onCategoryClose}
        // finalFocusRef={btnCategoryRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={color}>Categories</DrawerHeader>

          <DrawerBody color={color}>
            <CategoryNavigationList></CategoryNavigationList>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} /*finalFocusRef={btnRef}*/>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={color}>Application Settings</DrawerHeader>

          <DrawerBody color={color}>
            <Text mt="10">Configure checkout flow:</Text>
            <Select
              id="ThemeDropdown"
              onChange={selectChange}
              placeholder="Select a flow"
              value={currentcheckoutflow}
            >
              <option value="/check-out">Single page flow</option>
              <option value="/check-out-points">Single page points flow</option>
              <option value="/check-out-food">Food Item flow</option>
              <option value="/check-out-stepped">Stepped flow</option>
              <option value="/check-out-accordion">Accordion flow</option>
              <option value="/check-out-off-canvas">Off Canvas flow</option>
              <option value="/check-out-quote">Quote flow</option>
            </Select>
            <List ml="0px">
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Single Page Flow:</b> is based of an Amazon checkout where everything is done on
                one page.
              </ListItem>
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Points Flow:</b> is a flow designed to allow a user to shop with a spending
                account and redeem products via points.
              </ListItem>
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Food item Flow:</b> is a flow designed to allow a user to shop for menu items or
                products and pay with a credit card or with a spending account and redeem with
                points.
              </ListItem>
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Stepped Flow:</b> is the traditional flow that takes the user through a few steps
                to complete the checkout.
              </ListItem>
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Accordion Flow:</b> is similar to the stepped flow but everything is on one page
                and the user goes through each stepped presented in a accordion.
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Off Canvas Flow:</b> is a check out flow that slides in from the side and the
                checkout is completed in the side window.
              </ListItem>
              <ListItem mb="20px" fontSize="14px">
                <ListIcon as={HiCheckCircle} color="green.500" />
                <b>Quote Flow:</b> this flow is designed to be used to allow the user to request a
                price quote for a specific product. This will have a workflow where the amin will be
                able to send back a price for the customer to approve and buy or continue to
                negotiate the price.
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};
