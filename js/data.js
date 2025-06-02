//レスポンシブのbodyの設定
function adjustBodyPadding() {
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  document.body.style.paddingTop = headerHeight + 'px';
}

// 初回と、画面リサイズ時に実行
window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);



const modal = document.getElementById('modal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('sneakerForm');
    const output = document.getElementById('output');

    // モーダル開く
    openBtn.onclick = () => {
        const data = JSON.parse(localStorage.getItem('sneakerData')) || {};
  document.getElementById('model').value = data.model || '';
  document.getElementById('releaseDate').value = data.releaseDate || '';
  document.getElementById('retailPrice').value = data.retailPrice || '';
  document.getElementById('week1').value = data.week1 || '';
  document.getElementById('week2').value = data.week2 || '';
  document.getElementById('week3').value = data.week3 || '';
  document.getElementById('week4').value = data.week4 || '';   
    modal.style.display = 'block';
    // 追加: スクロールロック
  document.body.style.overflow = 'hidden';
    };

    // モーダル閉じる
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    // 追加: スクロール復活
    document.body.style.overflow = 'auto';
    };

    // 保存したデータ表示
    function displayData() {
      const data = JSON.parse(localStorage.getItem('sneakerData'));
      if (!data) return;
      output.innerHTML = `
        <div class="card">
          <h2>${data.model}</h2>
          <p>Releas date：${data.releaseDate}</p>
          <p>Retail Price：¥${data.retailPrice}</p>
          <p>Week1：¥${data.week1}</p>
          <p>Week2：¥${data.week2}</p>
          <p>Week3：¥${data.week3}</p>
          <p>Week4：¥${data.week4}</p>
        </div>
      `;
       // グラフ描画
  const retail = Number(data.retailPrice);
  const weeks = [Number(data.week1), Number(data.week2), Number(data.week3), Number(data.week4)];

  // Chart.js で描画
  const ctx = document.getElementById('priceChart').getContext('2d');

  // すでにグラフが存在すれば破棄
  if (window.priceChartInstance) {
    window.priceChartInstance.destroy();
  }

  window.priceChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week1', 'Week2', 'Week3', 'Week4'],
      datasets: [
        {
          label: 'Resale Price',
          data: weeks,
          borderColor: 'blue',
          fill: false,
          tension: 0.2
        },
        {
          label: 'Retail Price',
          data: [retail, retail, retail, retail],
          borderColor: 'red',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
    }

    // フォーム送信処理
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    
    //入力済データの取得
      const existing = JSON.parse(localStorage.getItem('sneakerData')) || {};
      
      const sneakerData = {
        model: document.getElementById('model').value,
        releaseDate: document.getElementById('releaseDate').value,
        retailPrice: document.getElementById('retailPrice').value,
        week1: document.getElementById('week1').value,
        week2: document.getElementById('week2').value,
        week3: document.getElementById('week3').value,
        week4: document.getElementById('week4').value,
      };
      localStorage.setItem('sneakerData', JSON.stringify(sneakerData));
      displayData();
      modal.style.display = 'none';
      form.reset();
    });

    // 初回ロード時に表示
    displayData();

    //スライド
    let index = 0;
    const slides = document.querySelector('.slides');
    const slider = document.querySelector('.slider'); //修正
    const images = document.querySelectorAll('.slides img'); //修正2
    //const totalSlides = document.querySelectorAll('.slides img').length; //修正
    //const totalSlides = 3;

    //修正2
    function updateSlideWidth() {
      const slideWidth = slider.clientWidth;
      slides.style.width = `${slideWidth * images.length}px`;
      images.forEach((img) => {
        img.style.width = `${slideWidth}px`;
      });
      slides.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    // 初回設定
    updateSlideWidth();

    // ウィンドウリサイズ対応
    window.addEventListener('resize', updateSlideWidth);

    // 自動スライド
setInterval(() => {
  index = (index + 1) % images.length;
  const slideWidth = slider.clientWidth;
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
}, 3000);
    
  



