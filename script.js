document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hoverText');
    const containers = document.querySelectorAll('.container');
    
    const approachBtn = document.getElementById('approach-btn');
    const questionnaireContainer = document.getElementById('questionnaire-container');
    const submitAnswersBtn = document.getElementById('submitBtn');

    let zoomedInContainer = null;

    containers.forEach(container => {
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
