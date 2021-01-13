// HTML Strings(element)
const infosResult = document.getElementById('result-title');
const infosCard = document.getElementById('overlay');
const searchL = document.getElementById('searchLabel');
const subSearchL = document.getElementById('sub-title-searchLabel');


// Verify emal input then load data
const loadApi = async () => {
    var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(document.getElementById('userEmail').value.match(mailFormat)){
        const htmlSpinner = `
                    <div class="spinner-border text-primary mb-2" style="width: 8rem; height: 8rem;" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                `
        infosResult.innerHTML = htmlSpinner;
        // Added next code to see the Spinner loading in 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
            // Return Email value
            const searchInput = document.getElementById('userEmail').value;
            // Fetch URL(API) based on the Email input
            const apiReturn = await fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${searchInput}`);
            let dataReturn = await apiReturn.json();
            console.log(dataReturn);
            // Check if no data return - email does not found
            if(dataReturn.length === 0) {
                infosCard.innerHTML = ``;
                // Update HTML element and styles based on the Data return
                const htmlResult = `
                    <h1>(0) Result Found.</h1>
                `;
                infosResult.innerHTML = htmlResult;
                searchL.innerHTML = `Check your entry and try again.`;
                document.getElementById('userEmail').value = '';
                document.getElementById('userEmail').focus();
            } else {
                const htmlResult = `
                    <h1>(1) Result(s) Found.</h1>
                    <p>
                    Look at the result below to see the details of the person you're searched for. 
                    </p>
                `;
                infosResult.innerHTML = htmlResult;
                displayInfos([dataReturn]);
                searchL.innerHTML = `Can't you find the right person!`;
                subSearchL.innerHTML = `
                    <p id="sub-title-searchLabel">
                        <strong style="color: #fac23c;">
                            Try again
                        </strong> - <b>Make a new search.</b>
                    </p>
                `;
                document.getElementById('userEmail').style.border = "1px";
            };
            
        } catch (er) {
            console.error(er);
        }
    } else {
        // Here, you may add as much as styles for Invalid email input
        document.getElementById('userEmail').style.border = "2px solid #FF0000";
        document.getElementById('userEmail').placeholder = "Email Format : 'name@gmail.com'"
        document.getElementById('userEmail').focus();
    }
};

// Display Data(API)
const displayInfos = (objs) => {
    const htmlUsefInfos = objs
        .map((obj) => {
            // The data format for Person - Email
            return `
            <div class="grid-container" id="overlay">
                <div class="description mb-3">
                    <p>${obj.description}</p>
                </div>
                <div class="address">
                    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                        <i class="fas fa-map-marked-alt"></i>
                        <p class="font-weight-light mb-0">
                            ${obj.address}  
                        </p>         
                    </div>
                </div>
                <div class="phone-number">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                    <i class="fas fa-phone-volume"></i>
                        <p class="font-weight-light mb-0">
                            ${obj.phone_numbers.map(phone => {
                                return `<p>${phone}</p>`;
                            }).join('')
                            } 
                        </p>         
                </div> 
                </div>
                <div class="email">
                    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                        <i class="fas fa-envelope-square"></i>
                        <p class="font-weight-light mb-0">
                            ${obj.email}  
                        </p>         
                    </div>
                </div>
                <div class="relative">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                    <i class="fas fa-users"></i>
                    <p class="font-weight-light mb-0">
                        ${obj.relatives.map(rel => {
                            return `<p>${rel}</p>`;
                        }).join('')
                        }
                    </p>         
                </div> 
                </div>
                <div class="user-img">
                    <img src="./img/user.png" alt="user">
                </div>
                <div class="name-age">
                    <h3>${obj.first_name} ${obj.last_name}</h3>
                </div>
            </div>
        `;
        })
        .join('');
        infosCard.innerHTML = htmlUsefInfos;
};
