import moment from 'moment';

// export const API_URL = process.env.REACT_APP_API_PRODUCTION;
export const API_URL = "http://localhost:3003/api";
// export const API_URL = 'https://vpllex-backend-production.vercel.app/vpllex/'


export const dateConverter = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY')
}

export const priceConverter = (price) => {
    return price?.toLocaleString()
}

export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const disabledDate = current => {
    // Disable dates before today
    return current && current < moment().endOf('day');
  };

export const offerBannerType = [
    {
        value: 'home-page',
        label: 'Home Page',
    },
    {
        value: 'offer-page',
        label: 'Offer Page',
    },
    {
        value: 'both',
        label: 'Both',
    },
]

export const SizeList = [
    {
        label : "Small",
        value : "small"
    },
    {
        label : "Medium",
        value : "medium"
    },
    {
        label : "Large",
        value : "large"
    },

]