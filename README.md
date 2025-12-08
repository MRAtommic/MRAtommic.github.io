# MRAtommic.github.io

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weeraphat Chuenchob | Interactive Portfolio</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #2c3e50;
            --accent: #3498db;
            --text: #333;
            --bg: #f4f7f6;
        }
        body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: var(--bg); color: var(--text); }
        
        header { background: var(--primary); color: white; padding: 3rem 1rem; text-align: center; }
        header h1 { margin: 0; }
        
        .container { max-width: 900px; margin: -30px auto 40px; padding: 20px; }
        .card { background: white; border-radius: 10px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        
        h2 { color: var(--primary); border-bottom: 3px solid var(--accent); padding-bottom: 5px; display: inline-block; margin-top: 0; }

        /* ส่วน Interactive Demo */
        .demo-box {
            background: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .controls {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        input { padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex: 1; }
        button {
            padding: 10px 20px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
        }
        button:hover { background: #2980b9; }
        
        .skill-tag { display: inline-block; background: #e1ecf4; color: #2c3e50; padding: 5px 12px; margin: 3px; border-radius: 15px; font-size: 0.9rem; }
        
        /* Responsive */
        @media (max-width: 600px) { .controls { flex-direction: column; } }
    </style>
</head>
<body>

    <header>
        <h1>Weeraphat Chuenchob</h1>
        <p>Data Science Student | Interactive Portfolio</p>
    </header>

    <div class="container">

        <div class="card" style="border-left: 5px solid #2ecc71;">
            <h2>🚀 Live Project Demo: Sales Analytics</h2>
            <p>This is an interactive dashboard demonstration. You can input data below to update the visualization in real-time.</p>
            
            <div class="demo-box">
                <canvas id="salesChart" height="150"></canvas>
                
                <div class="controls">
                    <input type="text" id="monthInput" placeholder="Enter Month (e.g., Dec)">
                    <input type="number" id="salesInput" placeholder="Enter Sales Value (e.g., 500)">
                    <button onclick="addData()">+ Add Data Point</button>
                    <button onclick="resetData()" style="background:#e74c3c;">Reset</button>
                </div>
                <p style="font-size: 0.8rem; color: #666; margin-top: 10px;">*Technique used: JavaScript (Chart.js) for client-side visualization.</p>
            </div>
        </div>

        <div class="card">
            <h2>About Me</h2>
            <p>IT (Data Science) student skilled in Python, SQL, and Data Analysis. Passionate about turning data into actionable insights.</p>
            <div style="margin-top: 15px;">
                <strong>Tech Stack:</strong>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">SQL</span>
                <span class="skill-tag">Data Visualization</span>
                <span class="skill-tag">JavaScript</span>
            </div>
        </div>

        <div class="card">
            <h2>Other Projects</h2>
            <ul style="padding-left: 20px;">
                <li><strong>Sales Prediction Model</strong> (Python) - Forecasted sales with 85% accuracy.</li>
                <li><strong>E-commerce Database</strong> (MySQL/PHP) - Designed relational schema for online store.</li>
            </ul>
        </div>

    </div>

    <script>
        // 1. ตั้งค่าข้อมูลเริ่มต้น
        let ctx = document.getElementById('salesChart').getContext('2d');
        let salesData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Monthly Sales ($)',
                data: [120, 190, 300, 500, 200],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: '#2c3e50',
                fill: true,
                tension: 0.4 // ทำให้เส้นโค้งสวยงาม
            }]
        };

        // 2. สร้างกราฟ
        let myChart = new Chart(ctx, {
            type: 'line', // เปลี่ยนเป็น 'bar' ถ้าอยากได้กราฟแท่ง
            data: salesData,
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // 3. ฟังก์ชันเพิ่มข้อมูล (Interactive)
        function addData() {
            const month = document.getElementById('monthInput').value;
            const value = document.getElementById('salesInput').value;

            if(month && value) {
                // เพิ่มข้อมูลลงใน Array
                myChart.data.labels.push(month);
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(value);
                });
                // อัปเดตกราฟทันที
                myChart.update();
                
                // เคลียร์ช่อง input
                document.getElementById('monthInput').value = '';
                document.getElementById('salesInput').value = '';
            } else {
                alert("Please enter both Month and Sales Value.");
            }
        }

        // 4. ฟังก์ชันรีเซ็ตข้อมูล
        function resetData() {
            myChart.data.labels = ['Jan', 'Feb', 'Mar'];
            myChart.data.datasets[0].data = [100, 200, 150];
            myChart.update();
        }
    </script>

</body>
</html>
