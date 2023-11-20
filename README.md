# XM Cloud Starter Kit (Next JS)

## QUICK START

1. In an ADMIN powershell terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

    Note: If you're a Sitecore employee:
        1. Connect to VPN
        2. Browse to \\mars.dk.sitecore.net\Installs\Licenses\
        3. Select "Sitecore Partner License"
        4. Drop the XML file in c:\license.xml and update -LicenseXmlPath accordingly

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

3. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

4. Create Edge token and [query from edge](#query-edge)

*** 

## About this Solution
This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA.


