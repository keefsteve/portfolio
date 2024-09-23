document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hoverText');
    const containers = document.querySelectorAll('.container');

    const userScore = parseInt(localStorage.getItem('userScore'), 10); 
    

    let zoomedInContainer = null;
   

    fetch("./assets/texts/textContents.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);  // debugging step to check the fetched data
            document.querySelector('.container.pink .content').innerHTML = data.post_pinkContainerText; 
            document.querySelector('.container.privileges .content').innerHTML = data.post_privilegesContainerText;
            document.querySelector('.container.food .content').innerHTML = data.post_foodContainerText;
            document.querySelector('.container.boundries .content').innerHTML = data.post_boundriesContainerText;  
        })
        .catch(error => console.error('Error loading content:', error));

       
        function displayObjectsBasedOnScore(userScore) {
            containers.forEach(container => {
                container.style.display = 'none';
    
                if (userScore == 14) {
                    container.style.display = 'block';
                } else if (userScore >= 10 && userScore < 14) {
                    if (container.classList.contains('pink') || container.classList.contains('green')) {
                        container.style.display = 'block';
                    }
                } else if (userScore >= 5 && userScore < 10) {
                    if (container.classList.contains('grey')) {
                        container.style.display = 'block';
                    }
                }
            });
        }
    
        displayObjectsBasedOnScore(userScore);


        /*
    function setRandomPosition(container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const buffer = 100; // space from edges and center

        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const noGoWidth = 20; 
        const noGoHeight = 30; 

        let validPosition = false;
        let randomLeft, randomTop;

        while (!validPosition) {
            randomLeft = Math.random() * (window.innerWidth - 300 - containerWidth - 2 * buffer) + buffer;
            randomTop = Math.random() * (window.innerHeight - containerHeight - 2 * buffer) + buffer;

            
            const withinNoGoZone = (
                randomLeft + containerWidth > centerX - noGoWidth / 2 &&
                randomLeft < centerX + noGoWidth / 2 &&
                randomTop + containerHeight > centerY - noGoHeight / 2 &&
                randomTop < centerY + noGoHeight / 2
            );

            if (!withinNoGoZone) {
                validPosition = true; 
            }
        }
        
        container.style.left = `${randomLeft}px`;
        container.style.top = `${randomTop}px`;
    } */


        

        function setPosition(container) {
            const width = window.innerWidth;
            const height = window.innerHeight;
        
            
            switch (true) {
                case(container.classList.contains('pink')):
                    container.style.left = `${0.75 * width}px`;
                    container.style.top = `${0.12 * height}px`; 
                    break;
            case(container.classList.contains('earth')):
                container.style.left = `${width - 700}px`;
                container.style.top = `${0.52 * height}px`;
            break;
            case(container.classList.contains('grey')):
                container.style.left = `${0.30 * width}px`;
                container.style.top = `${0.45 * height}px`;
                break;
            case(container.classList.contains('green')):
                container.style.left = `${0.24 * width}px`;
                container.style.top = `${0.4 * height}px`;
                break;
                case(container.classList.contains('food')):
                container.style.left = `${0.64 * width}px`;
                container.style.top = `${0.07 * height}px`;
                break;
                case(container.classList.contains('boundries')):
                container.style.left = `${0.44 * width}px`;
                container.style.top = `${0.2 * height}px`;
                break;
                case(container.classList.contains('privileges')):
                container.style.left = `${0.24 * width}px`;
                container.style.top = `${0.02 * height}px`;
                break;
            case(container.classList.contains('imgOne')):
            container.style.left = `${0.1 * width}px`;
            container.style.top = `${0.3 * height}px`;
            break;
            case(container.classList.contains('imgTwo')):
                container.style.left = `${0.42 * width}px`;
                container.style.top = `${0.55 * height}px`; 
                break;
            case(container.classList.contains('imgThree')):
                    container.style.left = `${width - 490}px`;
                    container.style.top = `${0.3 * height}px`;
                    break;
                }
            }
            
    containers.forEach(container => {

        setPosition(container);
     
        container.addEventListener('mousemove', (e) => {
            hoverText.style.display = 'block';
            hoverText.style.left = `${e.pageX + 10}px`;
            hoverText.style.top = `${e.pageY + 10}px`;
        });

        container.addEventListener('mouseout', () => {
            hoverText.style.display = 'none';
        });

        container.addEventListener('click', () => {
            if (zoomedInContainer) {
                zoomedInContainer.classList.remove('zoomed');
                if (zoomedInContainer === container) {
                    zoomedInContainer = null;
                    return;
                }
            }
            container.classList.add('zoomed');
            zoomedInContainer = container;
        });
    });


    document.addEventListener('click', (e) => {
        if (zoomedInContainer && !zoomedInContainer.contains(e.target)) {
            zoomedInContainer.classList.remove('zoomed');
            zoomedInContainer = null;
        }
    });

});
