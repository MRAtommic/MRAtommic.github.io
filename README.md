# MRAtommic.github.io
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weeraphat Chuenchob | Data Science Portfolio</title>
    <style>
        /* ตั้งค่าพื้นฐาน */
        :root {
            --primary: #2c3e50; /* สีน้ำเงินเข้มจาก Resume */
            --accent: #3498db;
            --text: #333;
            --bg: #f4f7f6;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.6;
        }
        
        /* ส่วน Header */
        header {
            background: var(--primary);
            color: white;
            padding: 4rem 1rem;
            text-align: center;
        }
        header h1 { margin: 0; font-size: 2.5rem; }
        header p { font-size: 1.2rem; opacity: 0.9; margin-top: 10px; }
        .contact-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: white;
            color: var(--primary);
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }

        /* กล่องเนื้อหา */
        .container {
            max-width: 800px;
            margin: -30px auto 20px;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h2 { color: var(--primary); border-bottom: 2px solid var(--accent); padding-bottom: 10px; display: inline-block; }
        
        /* Skills Tags */
        .skill-tag {
            display: inline-block;
            background: #e1ecf4;
            color: #2c3e50;
            padding: 5px 12px;
            margin: 5px;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        /* Projects List */
        .project-item {
            border-left: 4px solid var(--accent);
            padding-left: 15px;
            margin-bottom: 20px;
        }
        .project-item h3 { margin: 0 0 5px 0; }
        .tech-stack { font-size: 0.85rem; color: #666; font-style: italic; }

        /* Responsive */
        @media (max-width: 600px) {
            header { padding: 3rem 1rem; }
            .container { margin-top: 0; }
        }
    </style>
</head>
<body>

    <header>
        <h1>Weeraphat Chuenchob</h1>
        <p>Data Science Student | Python & SQL Enthusiast</p>
        <a href="mailto:mxmm2547@gmail.com" class="contact-btn">Contact Me</a>
    </header>

    <div class="container">
        
        <div class="card">
            <h2>About Me</h2>
            <p>
                IT (Data Science) student skilled in Python, SQL, and basic data analysis tools. 
                A fast learner with good interpersonal skills and a strong sense of responsibility. 
                Seeking an internship to develop data skills and grow in the technology industry.
            </p>
        </div>

        <div class="card">
            <h2>Technical Skills</h2>
            <div>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">SQL (MySQL)</span>
                <span class="skill-tag">Data Analysis</span>
                <span class="skill-tag">Java</span>
                <span class="skill-tag">C++</span>
                <span class="skill-tag">HTML/PHP</span>
                <span class="skill-tag">MongoDB</span>
            </div>
            <div style="margin-top: 15px;">
                <strong>Tools:</strong> VS Code, GitHub, Google Colab, Figma, Ubuntu
            </div>
        </div>

        <div class="card">
            <h2>Academic Projects</h2>
            
            <div class="project-item">
                <h3>Sales Prediction Model</h3>
                <div class="tech-stack">Python, Pandas, Scikit-learn</div>
                <p>Created a machine learning model to forecast monthly sales with high accuracy using linear regression techniques.</p>
            </div>

            <div class="project-item">
                <h3>E-commerce Database Design</h3>
                <div class="tech-stack">MySQL, PHP, HTML</div>
                <p>Designed a relational database structure for an online store to manage inventory and orders efficiently.</p>
            </div>

            <div class="project-item">
                <h3>Customer Segmentation Analysis</h3>
                <div class="tech-stack">Python, K-Means Clustering</div>
                <p>Analyzed customer behavior data to group customers for targeted marketing strategies.</p>
            </div>
        </div>

        <div class="card">
            <h2>Education</h2>
            <p><strong>King Mongkut's University of Technology</strong><br>
            Information Technology (Data Science) | 2023 - Present</p>
        </div>

    </div>

</body>
</html>
