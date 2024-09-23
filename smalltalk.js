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

        

        function setPosition(container) {
            const width = window.innerWidth;
            const height = window.innerHeight;
        
            switch (true) {
                case(container.classList.contains('orange')):
                    container.style.left = `${0.75 * width}px`;
                    container.style.top = `${0.12 * height}px`; 
                    break;
            case(container.classList.contains('purp')):
                container.style.left = `${width - 700}px`;
                container.style.top = `${0.22 * height}px`;
            break;
            case(container.classList.contains('grey')):
                container.style.left = `${0.30 * width}px`;
                container.style.top = `${0.45 * height}px`;
                break;
            case(container.classList.contains('green')):
                container.style.left = `${0.24 * width}px`;
                container.style.top = `${0.07 * height}px`;
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

    if (approachBtn) {
    approachBtn.addEventListener('click', () => {
        window.location.href = 'questionnaire.html'; 
    });
}
    });

});
