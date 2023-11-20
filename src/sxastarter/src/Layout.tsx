/**
 * This Layout is needed for Starter Kit.
 */

import { Box, Flex } from '@chakra-ui/react';
import {
  Field,
  LayoutServiceData,
  Placeholder,
  getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { ApiRole } from 'ordercloud-javascript-sdk';
import { Chakra } from '../src/components/Chakra';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { OcConfig } from 'src/redux/ocConfig';
import OcProvider from '../src/redux/ocProvider';
import React from 'react';
import defaultSEOConfig from '../next-seo.config';

// import "src/styles/globals.css"

export const ocConfig: OcConfig = {
  clientId:
    '147BBCE2-6B4D-4575-98A1-E32FF973EB37' /* This is the client ID of your seeded OrderCloud organization  ORDER CLOUD MARKETPLACE */,
  baseApiUrl: 'https://sandboxapi.ordercloud.io' /* API Url, leave as is for Sandbox */,
  isPreviewing:
    Boolean(process.env.EXPERIENCE_EDITOR_MODE) ||
    true /* Whether or not this is being rendered in xm experience editor*/,
  scope: [
    'FullAccess',
    'Shopper',
    'MeAddressAdmin',
    'OrderAdmin',
    'OverrideShipping',
    'SpendingAccountAdmin',
  ] as ApiRole[] /* Default user role */,
  allowAnonymous: false /* Whether anonymous product browsing is allowed */,
};

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <OcProvider config={ocConfig}>
        <Chakra>
          <Head>
            <title>{fields?.Title?.value?.toString() || 'Page'}</title>
            <link rel="icon" href={`${publicUrl}/favicon.ico`} />
          </Head>

          {/* root placeholder for the app, which we add components to using route data */}
          <div className={mainClassPageEditing}>
            <header>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                minHeight="70vh"
                gap={4}
                mb={8}
                w="full"
              >
                <DefaultSeo {...defaultSEOConfig} />
                <Box id="content" w="100%" width="full" maxW="1500px" pr="5" pl="5">
                  {route && <Placeholder name="headless-main" rendering={route} />}
                </Box>
              </Flex>
            </main>
            <footer>
              <div id="footer">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </footer>
          </div>
        </Chakra>
      </OcProvider>
    </>
  );
};

export default Layout;
