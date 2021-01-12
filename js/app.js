const infosResult = document.getElementById('result-title');
const infosCard = document.getElementById('overlay');
const searchL = document.getElementById('searchLabel');
const subSearchL = document.getElementById('sub-title-searchLabel');



const loadApi = async () => {
    var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(document.getElementById('userEmail').value.match(mailFormat)){
        try {
            const searchInput = document.getElementById('userEmail').value;
            const apiReturn = await fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${searchInput}`);
            let dataReturn = await apiReturn.json();
            console.log(dataReturn);
            if(dataReturn.length === 0) {
                infosCard.innerHTML = ``;
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
                        <strong style="color: rgb(235, 235, 144);">
                            Try again
                        </strong> - Make a new search.
                    </p>
                `;
                document.getElementById('userEmail').style.border = "1px";
            };
            
        } catch (er) {
            console.error(er);
        }
    } else {
        document.getElementById('userEmail').style.border = "2px solid #FF0000";
        document.getElementById('userEmail').placeholder = "Email Format : 'name@gmail.com'"
        document.getElementById('userEmail').focus();
    }
};

const displayInfos = (objs) => {
    const htmlUsefInfos = objs
        .map((obj) => {
            return `
            <div class="grid-container" id="overlay">
                <div class="description mb-3">
                    ${obj.description}
                </div>
                <div class="address">
                    <ul>
                        <strong>Address</strong>
                        <li>${obj.address}</li>
                    </ul>
                </div>
                <div class="phone-number">
                    <ul>
                        <strong>Phone Number(s)</strong>
                        ${obj.phone_numbers.map(phone => {
                            return `<li>${phone}</li>`;
                        }).join('')
                        }
                    </ul>
                </div>
                <div class="email">
                    <ul>
                        <strong>Email</strong>
                        <li>${obj.email}</li>
                    </ul>
                </div>
                <div class="relative">
                    <ul>
                        <strong>Relatives</strong>
                        ${obj.relatives.map(rel => {
                            return `<li>${rel}</li>`;
                        }).join('')
                        }
                    </ul>
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

