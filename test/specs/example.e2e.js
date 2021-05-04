const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', async() => {
    it('should take JS coverage', async () => {
        /**
         * enable necessary domains
         */
        await browser.cdp('Profiler', 'enable')
        await browser.cdp('Debugger', 'enable')

        /**
         * start test coverage profiler
         */
        await browser.cdp('Profiler', 'startPreciseCoverage', {
            callCount: true,
            detailed: true
        })

        await browser.url('http://google.com')

        /**
         * capture test coverage
         */
        const { result } = await browser.cdp('Profiler', 'takePreciseCoverage')
        const coverage = result.filter((res) => res.url !== '')
        console.log(coverage)
    })

    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});


