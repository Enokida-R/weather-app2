document.addEventListener('DOMContentLoaded', (event) => {
    const imagesToPreload = ['/weather/sunny.png','/weather/ash.png ','/weather/clouds.png', '/weather/drizzle.png', '/weather/dust.png', '/weather/fog.png', '/weather/haze.png', '/weather/mist.png', '/weather/Rain.png', '/weather/sand.png', '/weather/smoke.png', '/weather/snow.png', '/weather/squall.png', '/weather/sunny.png', '/weather/thunderstom.png', '/weather/tornado.png'];
    imagesToPreload.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
    });
});


document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;

    fetch(`/weather?location=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            const bodyElement = document.querySelector('body');
            const weather = data.weather[0];


            let weatherImage = '';
            switch (weather.main) {
                case 'Clear':
                    backgroundImageUrl = 'url(./weather/sunny.png)';
                    break;
                case 'Clouds':
                    backgroundImageUrl = 'url(./weather/clouds.png)';
                    break;
                case 'Rain':
                    backgroundImageUrl = 'url(./weather/Rain.png)';
                    break;    
                case 'Snow':
                    backgroundImageUrl = 'url(./weather/snow.png)';
                break;
                case 'Thubderstom':
                    backgroundImageUrl = 'url(./weather/thunderstom.png)';
                break;
                case 'Drizzle':
                    backgroundImageUrl = 'url(./weather/drizzle.png)';
                break;
                case 'MIst':
                    backgroundImageUrl = 'url(./weather/mist.png)';
                break;
                case 'Smoke':
                    backgroundImageUrl = 'url(./weather/smoke.png)';
                break;
                case 'Haze':
                    backgroundImageUrl = 'url(./weather/haze.png)';
                break;
                case 'Dust':
                    backgroundImageUrl = 'url(./weather/dust.png)';
                break;
                case 'Fog':
                    backgroundImageUrl = 'url(./weather/fog.png)';
                break;
                case 'Sand':
                    backgroundImageUrl = 'url(./weather/sand.png)';
                break;
                case 'Ash':
                    backgroundImageUrl = 'url(./weather/ash.png)';
                break;
                case 'Squall':
                    backgroundImageUrl = 'url(./weather/squall.png)';
                break;
                case 'Tirnado':
                    backgroundImageUrl = 'url(./weather/tornado.png)';
                break;
            }

            // CSS を使って背景画像を設定
            bodyElement.style.backgroundImage = backgroundImageUrl;
            bodyElement.style.backgroundSize = 'cover'; // 背景画像をカバー全体に
            bodyElement.style.backgroundRepeat = 'no-repeat'; // 繰り返し無し
            bodyElement.style.backgroundPosition = 'center center'; // 中央に配置


            document.getElementById('weatherResult').innerHTML =
                `${weather.main}<br>
            現在の気温:${data.main.temp}°<br>
            最低気温:${data.main.temp_min}°<br>
            最高気温:${data.main.temp_max}°<br>
            湿度:${data.main.humidity}%`
        } else {
            document.getElementById('weatherResult').innerHTML = '情報を取得できませんでした。';
        }
        document.getElementById('weatherResult').style.color = 'blue'; // 文字色を青に設定

    })
    .catch(error => {
        console.error('エラー', error);
        document.getElementById('weatherResult').innerHTML = 'エラーが発生しました。'
    });
});

