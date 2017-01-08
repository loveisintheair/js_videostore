"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;

    for (let rental of customer.rentals) {
        let movie = getRentalMovie(rental);
        let rentalAmount = getRentalAmount(movie, rental);

        //add frequent renter points
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if (movie.code === "new" && rental.days > 2) frequentRenterPoints++;

        //print figures for this rental
        result += `\t${movie.title}\t${rentalAmount}\n`;
        totalAmount += rentalAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points\n`;

    return result;

    function getRentalMovie(rental) {
        return movies[rental.movieID];
    }

    function getRentalAmount(movie, rental) {
        let rentalAmount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                rentalAmount = 2;
                if (rental.days > 2) {
                    rentalAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                rentalAmount = rental.days * 3;
                break;
            case "childrens":
                rentalAmount = 1.5;
                if (rental.days > 3) {
                    rentalAmount += (rental.days - 3) * 1.5;
                }
                break;
        }

        return rentalAmount;
    }
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

console.log(statement(customer, movies));