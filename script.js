document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hoverText');
    const containers = document.querySelectorAll('.container');
    
    const approachBtn = document.getElementById('approach-btn');
    let zoomedInContainer = null;

    fetch("./assets/texts/textContents.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Debugging step to check the fetched data
            document.querySelector('.container.blue .content').innerHTML = data.pre_blueContainerText;
            document.querySelector('.container.orange .content').innerHTML = data.pre_orangeContainerText;
        })
        .catch(error => console.error('Error loading content:', error));

        function setRandomPosition(container) {
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const buffer = 50; // space from edges and center
    
            // Avoid central no-go zone
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const noGoWidth = 100; // Width of the central no-go zone
            const noGoHeight = 100; // Height of the central no-go zone
    
            let validPosition = false;
            let randomLeft, randomTop;
    
            while (!validPosition) {
                randomLeft = Math.random() * (window.innerWidth - containerWidth - 2 * buffer) + buffer;
                randomTop = Math.random() * (window.innerHeight - containerHeight - 2 * buffer) + buffer;
    
                // Check if the position avoids the central no-go zone
                const withinNoGoZone = (
                    randomLeft + containerWidth > centerX - noGoWidth / 2 &&
                    randomLeft < centerX + noGoWidth / 2 &&
                    randomTop + containerHeight > centerY - noGoHeight / 2 &&
                    randomTop < centerY + noGoHeight / 2
                );
    
                if (!withinNoGoZone) {
                    validPosition = true; // The position is valid
                }
            }
    
            container.style.left = `${randomLeft}px`;
            container.style.top = `${randomTop}px`;
        }
    containers.forEach(container => {

        setRandomPosition(container);

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
