const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('web scraping');


async function robo() {
  const browser = await puppeteer.launch({ headless : true });
  const page = await browser.newPage();
  const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
  const moedaFinal = readlineSync.question('Informe a moeda desejada: ') || 'real';

  const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1GCEU_pt-BRBR911BR911&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.2062j1j1&sourceid=chrome&ie=UTF-8`;
  await page.goto(qualquerUrl);
  //await page.screenshot({path: 'coins.png'});

  const resultado = await page.evaluate(() => {
      return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });

  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);
  await browser.close();
}

robo();