@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to right, #e0f7fa, #f1faff);
}

/* Header */
.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: linear-gradient(to right, #0077b6, #00b4d8);
    color: white;
    flex-wrap: wrap;
}

.header-left h1 {
    margin: 0;
    font-size: 28px;
}

.project-subtitle {
    margin: 5px 0 0 0;
    font-size: 14px;
    font-weight: 300;
    opacity: 0.9;
}

.header-right {
    font-size: 16px;
    font-weight: 500;
}

/* Search Section */
.search-container {
    text-align: center;
    margin: 20px;
}

.upload-section {
    text-align: center;
    margin-bottom: 20px;
}

input {
    padding: 12px;
    width: 250px;
    border-radius: 25px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 14px;
}

button {
    padding: 12px 18px;
    border-radius: 25px;
    border: none;
    background: #0077b6;
    color: white;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #023e8a;
}

/* Map */
#map {
    height: 400px;
    margin: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Store Cards */
.store-card {
    background: white;
    margin: 15px auto;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: 0.3s;
}

.store-card:hover {
    transform: translateY(-5px);
}

.store-card h3 {
    margin: 0;
    color: #0077b6;
}

.store-card p {
    margin: 5px 0;
    font-size: 14px;
}
