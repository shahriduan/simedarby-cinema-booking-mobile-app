const apiRoute = [
    { path: '/api/authenticate', name: 'auth', method: 'post' },
    { path: '/api/logout', name: 'logout', method: 'post' },
    { path: '/api/user', name: 'user', method: 'get' },
    
    // Movies
    { path: '/api/movies', name: 'movies', method: 'get' },
    { path: '/api/movies/:movie_id', name: 'movie_details', method: 'get' },

    // FnB
    { path: '/api/fnb/menu', name: 'fnb_menu', method: 'get' },

    // Area
    { path: '/api/areas', name: 'area', method: 'get' },
    { path: '/api/cinemas', name: 'cinema', method: 'get' },

    // Booking
    { path: '/api/booking/details/:booking_id', name: 'booking_details', method: 'get' },
    { path: '/api/booking/ticket', name: 'booking_ticket', method: 'post' },
    { path: '/api/booking/fnb/:booking_id', name: 'submit_fnb', method: 'post' },
    { path: '/api/booking/redeem-promo/:booking_id', name: 'redeem_promo', method: 'post' },
    { path: '/api/booking/payment/:booking_id', name: 'make_payment', method: 'post' },
    { path: '/api/booking/showtime/unavailable-seats', name: 'unavailable_seat', method: 'get' },
];

export default apiRoute;