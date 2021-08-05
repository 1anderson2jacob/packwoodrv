'use strict';
import { centeredPopup } from './popup-window.js';

let numSites = 87;
let sitesArr = [];
let unavailableSites = [];
let elCalendar = $('#calendar');
let elForm = $('#form');
let elInput = $('input');
let elSiteNumMenu = $('#site-number');
let elSiteSelect = $('#site-select');
let checkoutButton = document.getElementById('checkout-button');
// const BACKEND_URL = 'https://packwoodrv-backend.herokuapp.com';
const BACKEND_URL = 'http://localhost:3000';
const FRONTEND_URL_ORIGIN = 'http://127.0.0.1:8080';
// const FRONTEND_URL_ORIGIN = 'http://packwoodrv.com';
const STRIPE_PUB_KEY = 'pk_test_51IIdheJUohNhFpMm2NjymlNZLJ9lVsJOhgupmDcUnLfwvtWHjzAVDcQtYisRBOYIhc5SOE6E68SLIUetSGOYF5H400ROSjLhfg';
const stripe = Stripe(STRIPE_PUB_KEY);
let pricesObj = {
  daily: '',
  monthly: '',
  weekly: '',
};

$('#reservations-map').on('click', () => {
  const url = './reservations-map.html';
  const winName = 'Select a site(s)';
  //ratio is width is 90/105 of height
  const h = screen.height * .9;
  const w = h * (90 / 105);
  const scroll = false;
  let popup = centeredPopup(url, winName, w, h, scroll);
  popup.unavailableSites = [1, 2, 5, 22, 45, 56, 67, 78];
  popup.windowTest = function (str) {
    console.log(str);
  };
  // popup.unavailableSites = unavailableSites;
});

loadPrices();

// $('#site-number').prop('disabled', true);
elSiteSelect.addClass('ui-state-disabled');

let formObj = {
  type: '',
  arrivalDate: '',
  departureDate: '',
  siteNum: '',
  subTotal: '',
};

const handler = {
  get(target, property) {

  },

  set(target, property, value) {
    if (property === 'type') {
      $('#span-site-type').text(value);

    } else if (property === 'arrivalDate') {
      $('#span-departure-date').text('');
      $('#span-subtotal').text('');
      $('#span-site-number').text('');
      $('#span-arrival-date').text(value);

    } else if (property === 'departureDate') {
      $('#span-departure-date').text(value);
      proxyForm.subTotal = calcSubtotal(formObj.arrivalDate, value);
      console.log({ formObj });

    } else if (property === 'siteNum') {
      $('#span-site-number').text(value);

    } else if (property === 'subTotal') {
      let price = `$${(value / 100).toFixed(2)}`;
      $('#span-subtotal').text(price);
    }

    target[property] = value;
    return true;
  },
};

const proxyForm = new Proxy(formObj, handler);

for (let i = 0; i < numSites; i++) {
  sitesArr.push(i + 1);
}

elCalendar.multiDatesPicker({
  maxPicks: 2,
  minDate: 0,
  onSelect: handleDateSelect,
});

elForm.accordion({
  heightStyle: 'content',
});

elInput.checkboxradio().change((e) => {

  if (e.target.id === 'radio-1') {
    proxyForm.type = 'RV';
  } else {
    proxyForm.type = 'Tent';
  }
});

elSiteNumMenu.selectmenu({
  change: (e) => {
    proxyForm.siteNum = $('#site-number option:selected').text();
  }
});

function calcSubtotal(startDate, endDate) {
  console.log({ startDate })
  let numDays = calcNumDays(startDate, endDate);
  console.log(`Number of days: ${numDays}`);
  if (numDays < 7) {
    //daily rate
    console.log(`Daily rate: $${pricesObj.daily}`);
    return (pricesObj.daily * numDays);
  } else if (numDays < 28) {
    //weekly rate
    console.log(`Weekly rate: $${pricesObj.weekly}`);
    return (pricesObj.weekly * numDays);
  } else {
    //monthly rate
    console.log(`Monthly rate: $${pricesObj.monthly}`);
    return (pricesObj.monthly * numDays);
  }
}

function calcNumDays(date1, date2) {
  let startDate = new Date(date1);
  let endDate = new Date(date2);

  let timeDiff = endDate.getTime() - startDate.getTime();

  let numDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  return numDays;
}

function loadPrices() {
  getPrices()
    .then(data => {
      pricesObj.daily = data.daily;
      pricesObj.weekly = data.weekly;
      pricesObj.monthly = data.monthly;
    })
}

function handleDateSelect(e) {
  let dates = elCalendar.multiDatesPicker('getDates');

  if (dates.length === 1) {
    elSiteSelect.addClass('ui-state-disabled');
    proxyForm.arrivalDate = dates[0];
  }
  if (dates.length > 1) {
    elSiteSelect.removeClass('ui-state-disabled');
    proxyForm.departureDate = dates[1];

    getSites(dates[0], dates[1])
      .then(data => {
        unavailableSites = data.results;
        addSitesToMenu(unavailableSites);
      });
  }
}

async function getSites(startDate, endDate) {
  let params = `startDate=${startDate}&endDate=${endDate}`;
  const url = `${BACKEND_URL}/api/v1/reservations/available-sites?${params};`;
  // const url = 'http://localhost:3000/api/v1/reservations/available-sites?' + params;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function getPrices() {
  const url = `${BACKEND_URL}/stripe/prices`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

function addSitesToMenu(unavailableSites) {
  elSiteNumMenu.empty();
  let filteredSites = sitesArr.filter(site => !unavailableSites.includes(site));
  filteredSites.forEach(site => {
    elSiteNumMenu.append(
      $('<option/>', {
        value: site,
        text: site,
      }),
    );
  });
}

checkoutButton.addEventListener('click', function () {

  //check that reservation card has all items
  let numDays = calcNumDays(formObj.arrivalDate, formObj.departureDate);
  let bodyObj = {
    dateStart: formObj.arrivalDate,
    dateEnd: formObj.departureDate,
    siteNumber: formObj.siteNum,
    siteType: formObj.type,
    totalDays: numDays,
  };

  console.log({bodyObj});

  let checkoutCheck = checkoutReady();
  if (Array.isArray(checkoutCheck) || !hasAllValues(bodyObj)) {
    //put red asterik in each item
    checkoutCheck.forEach(el => {
      el.html('<span id="asterik">*</span>');
    });

  } else {
    fetch(`${BACKEND_URL}/stripe/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

});

function checkoutReady() {
  const a = $('#span-site-type');
  const b = $('#span-arrival-date');
  const c = $('#span-departure-date');
  const d = $('#span-site-number');

  let arr = [];

  if (a.text() === '' || a.text() === '*') {
    arr.push(a);
  }
  if (b.text() === '' || b.text() === '*') {
    arr.push(b);
  }
  if (c.text() === '' || c.text() === '*') {
    arr.push(c);
  }
  if (d.text() === '' || d.text() === '*') {
    arr.push(d);
  }

  if (arr.length > 0) {
    return arr;
  } else {
    return true;
  }
}

function hasAllValues(obj) {
  //returns true if obj has values for every key, false if it doesn't.
  //currently not working but always returning true
  let arr = Object.keys(obj);
  for (let i = 0; i < arr.length; i++) {
    if (!obj.hasOwnProperty(arr[i])) {
      console.log('Object missing values');
      return false;
    }
  }
  return true;
}