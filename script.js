document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hoverText');
    const containers = document.querySelectorAll('.container');
    
    const approachBtn = document.getElementById('approach-btn');

    let zoomedInContainer = null;

    fetch("./assets/texts/textContents.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);  // debugging step to check the fetched data
            document.querySelector('.container.purp .content').innerHTML = data.pre_purpContainerText;
            document.querySelector('.container.green .content').innerHTML = data.pre_greenContainerText;
            document.querySelector('.container.grey .content').innerHTML = data.pre_greyContainerText;
        })
        .catch(error => console.error('Error loading content:', error));

       
        
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
        }

        function setPosition(container) {
            const width = window.innerWidth;
            const height = window.innerHeight;
        
            switch (true) {
                case container.classList.contains('orange'):
                    container.style.left = `${width - 300}px`;
                    container.style.top = `${0.1 * height}px`;
                    break;
                case container.classList.contains('imgOne'):
                    container.style.left = `${0.1 * width}px`;
                    container.style.top = `${0.3 * height}px`;
                    break;
                case container.classList.contains('imgTwo'):
                    container.style.left = `${0.42 * width}px`;
                    container.style.top = `${0.55 * height}px`;
                    break;
                case container.classList.contains('imgThree'):
                    container.style.left = `${width - 400}px`;
                    container.style.top = `${0.3 * height}px`;
                    break;
            }
        }
        
        
            
    containers.forEach(container => {

        setRandomPosition(container);
        setPosition(container);
     
     
            if(container.classList.contains('orange')){
                container.style.left = `${window.innerWidth - 300}px`;
                container.style.top = `${0.1 * window.innerHeight}px`;
            }
            if(container.classList.contains('imgOne')){
            container.style.left = `${0.1*window.innerWidth}px`;
            container.style.top = `${0.3 * window.innerHeight}px`;
            }
            if(container.classList.contains('imgTwo')){
                container.style.left = `${0.42*window.innerWidth}px`;
                container.style.top = `${0.55 * window.innerHeight}px`;
}
            if(container.classList.contains('imgThree')){
                    container.style.left = `${window.innerWidth - 400}px`;
                    container.style.top = `${0.3 * window.innerHeight}px`;
                }

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

    if (approachBtn) {
    approachBtn.addEventListener('click', () => {
        window.location.href = 'questionnaire.html'; 
    });
}
    });

});
