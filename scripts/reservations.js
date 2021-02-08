'use strict';

let numSites = 87
let sitesArr = [];
let elCalendar = $('#calendar');
let elForm = $('#form');
let elInput = $('input');
let elSiteNumMenu = $('#site-number');
let elSiteSelect = $('#site-select');
let checkoutButton = document.getElementById('checkout-button');

const stripe = Stripe('pk_test_51HeP21DDWjIzZ5AKhZvGvh1tibkK2doangylNyItxkhufFKgNrBCpdPxfw1EarMm2JFpQsaNlIjQFpptWzyXkjMD00UolXiJLB');

let pricesObj = {
  daily: '',
  monthly: '',
  weekly: ''
}

loadPrices();

// $('#site-number').prop('disabled', true);
elSiteSelect.addClass("ui-state-disabled");

let formObj = {
  type: '',
  arrivalDate: '',
  departureDate: '',
  siteNum: '',
  subTotal: ''
}

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
      console.log({ formObj })

    } else if (property === 'siteNum') {
      $('#span-site-number').text(value);

    } else if (property === 'subTotal') {
      let price = `$${(value / 100).toFixed(2)}`;
      $('#span-subtotal').text(price);
    }

    target[property] = value;
    return true;
  }
}
const proxyForm = new Proxy(formObj, handler);

for (let i = 0; i < numSites; i++) {
  sitesArr.push(i + 1)
}

elCalendar.multiDatesPicker({
  maxPicks: 2,
  minDate: 0,
  onSelect: handleDateSelect
});

elForm.accordion({
  heightStyle: 'content'
});

elInput.checkboxradio().change((e) => {

  if (e.target.id === 'radio-1') {
    proxyForm.type = 'RV'
  } else {
    proxyForm.type = 'Tent'
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
  console.log(`Number of days: ${numDays}`)
  if (numDays < 7) {
    //daily rate
    console.log(`Daily rate: $${pricesObj.daily}`);
    return (pricesObj.daily * numDays)
  } else if (numDays < 28) {
    //weekly rate
    console.log(`Weekly rate: $${pricesObj.weekly}`);
    return (pricesObj.weekly * numDays)
  } else {
    //monthly rate
    console.log(`Monthly rate: $${pricesObj.monthly}`);
    return (pricesObj.monthly * numDays)
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
    elSiteSelect.addClass("ui-state-disabled");
    proxyForm.arrivalDate = dates[0];
  }
  if (dates.length > 1) {
    elSiteSelect.removeClass("ui-state-disabled");
    proxyForm.departureDate = dates[1];

    getSites(dates[0], dates[1])
      .then(data => {
        console.log(data.results);
        addSitesToMenu(data.results);
      })
  };
}

async function getSites(startDate, endDate) {
  let params = `startDate=${startDate}&endDate=${endDate}`;
  let url = 'http://localhost:3000/api/v1/reservations/available-sites?' + params;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json();
}

async function getPrices() {
  let url = 'http://localhost:3000/prices/';
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json();
}

function addSitesToMenu(unavailableSites) {
  console.log('in addSitesToMenu');
  elSiteNumMenu.empty();
  let filteredSites = sitesArr.filter(site => !unavailableSites.includes(site));
  console.log('filtered sites: ' + filteredSites.length);

  filteredSites.forEach(site => {
    // menu.append(new Option(site, site));
    elSiteNumMenu.append(
      $('<option/>', {
        value: site,
        text: site
      })
    )
  })
}

checkoutButton.addEventListener('click', function () {

  //check that reservation card has all items
  let checkoutCheck = checkoutReady();
  if (Array.isArray(checkoutCheck)) {
    //put red asterik in each item
    checkoutCheck.forEach(el => {
      // el.text('*');
      el.append('<span id="asterik">*</span>');
    });

  } else {
    let numDays = calcNumDays(formObj.arrivalDate, formObj.departureDate);

    let bodyObj = {
      dateStart: formObj.arrivalDate,
      dateEnd: formObj.departureDate,
      siteNumber: formObj.siteNum,
      siteType: formObj.type,
      totalDays: numDays
    }

    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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

  if (a.text() === '') {
    arr.push(a);
  }
  if (b.text() === '') {
    arr.push(b);
  }
  if (c.text() === '') {
    arr.push(c);
  }
  if (d.text() === '') {
    arr.push(d);
  }

  if (arr.length > 0) {
    return arr;
  } else {
    return true;
  }
}