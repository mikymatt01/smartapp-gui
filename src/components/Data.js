export const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets: [
        {
            label: "Machine 1",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
            borderColor: "rgb(75, 192, 192)",
        },

        {
            label: "Machine 2",
            data: [2000, 7000, 5000, 3000, 9000, 8000, 6000],
            borderColor: "green",
        },
        {
            label: "Machine 3",
            data: [4000, 3000, 2000, 5000, 4000, 3000, 2000],
            borderColor: "rgb(11, 64, 98)",
        },
    ],
};

export const barChartData = {

    lables: ["Rent", "Groceries", "Utilities", "Enterrainment", "Transport"],
    datasets: [
        {
            label: "Expenses",
            data: [100, 30, 50, 80, 15],
            backgroundColor: ["rgba (54, 162, 235, 0.8)"],
            borderColor: ["rgba (54, 162, 235, 1)"],
            borderWidth: 1,
        },
    ],
};

export const pieChartData = {
    lables: ["Facebook", "Instagram", "Twitter", "YouTube", "LinkedIn"],
    datasets: [{
        lable: "Time spent",
        data: [100, 60, 40, 90, 45],
        backgroundColor: [
            'rgba(124, 162, 25, 0.8)',
            'rgba(54, 162, 255, 0.8)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 4,

        hoverOffset: 4,
    },],

};