import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="about-content">
        <header className="about-header">
          <h1>About Bulta</h1>
        </header>

        {/* English Version */}
        <section className="language-section">
          <div className="language-badge">English Version</div>

          <div className="about-section">
            <h2>About Me</h2>
            <p>
              Hi, I'm Bulta. I'm currently a Technical Team Lead at one of Sri Lanka's leading software companies.
              My journey in tech began in 2016 without any formal qualifications, but I've always believed in learning
              while doing. Along the way, I completed my HND in IT at SLIATE, and later earned my Bachelor's degree
              from the University of Moratuwa in 2019, graduating with Second Class Upper Division honors.
            </p>
            <p>
              Over the years, I've gained valuable experience in the software industry, and this blog is my way of
              giving back by sharing what I've learned.
            </p>
          </div>

          <div className="about-section">
            <h2>What This Blog Is About</h2>
            <p>
              The purpose of this site is simple: knowledge sharing. You'll find content in both Sinhala and English.
              When I need to share information with my team or address technical topics that benefit from English
              terminology, I'll write in English. However, for most posts, I prefer writing in Sinhala because I
              believe we understand concepts best in our mother tongue.
            </p>

            <h3>I cover topics including:</h3>
            <div className="topics-grid">
              <div className="topic-card">
                <div className="topic-icon">💻</div>
                <h3>Software Engineering</h3>
                <p>Java, Spring Boot, Node.js, Angular, Microservices</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🚀</div>
                <h3>DevOps</h3>
                <p>Docker, Kubernetes, CI/CD pipelines</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🤖</div>
                <h3>AI</h3>
                <p>Trending topics and tools</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">📚</div>
                <h3>Best Practices</h3>
                <p>General knowledge and industry standards</p>
              </div>
            </div>

            <p>
              Whether one person reads this or a hundred, my goal remains the same: to create a resource for anyone
              eager to learn. If you're here to grow your knowledge, welcome—you're in the right place.
            </p>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Sinhala Version */}
        <section className="language-section sinhala-section">
          <div className="language-badge">සිංහල / Sinhala Version</div>

          <div className="about-section">
            <h2>මා ගැන</h2>
            <p>
              හායි, මම බුල්ට. දැන් මම ශ්‍රී ලංකාවේ ප්‍රසිද්ධ software company එකක technical team lead කෙනෙක් විදියට වැඩ කරනවා.
              මගේ career එක ආරම්භ වුණේ 2016 දී කිසිම paper qualification එකක් නැතිව. වැඩ කරද්දී මම SLIATE එකේ HND IT එක
              complete කළා, ඊට පස්සේ 2019 දී මොරටුව university එකෙන් bachelor degree එක second upper class එකක් ගත්තා.
            </p>
            <p>
              පසුගිය අවුරුදු ටිකේ මම industry එකේ හොඳ දැනුමක් ලබා ගත්තා කියලා විශ්වාස කරනවා. ඒ දැනුම share කරන්න තමයි
              මේ blog site එක හදාගත්තේ.
            </p>
          </div>

          <div className="about-section">
            <h2>මේ Blog එක ගැන</h2>
            <p>
              මේ site එකේ purpose එක සරලයි - දැනුම share කරන එක. Content එක සිංහල සහ English යන භාෂා දෙකෙන්ම ලියනවා.
              සමහර අවස්ථාවල මගේ team members සමඟ දැනුම share කරන්න වෙනවා, ඒ විදිහේ scenarios වලදී මම English වලින්
              ලියනවා. ඒත් general cases වලදී මම සිංහලෙන් ලියන්න prefer කරනවා, මොකද අපේ mother tongue එකෙන් තමයි දේවල්
              clear විදියට තේරුම් ගන්න පුළුවන් කියලා මම විශ්වාස කරනවා.
            </p>

            <h3>මම ලියන topics:</h3>
            <div className="topics-grid">
              <div className="topic-card">
                <div className="topic-icon">💻</div>
                <h3>Software Engineering</h3>
                <p>Java, Spring Boot, Node.js, Angular, Microservices</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🚀</div>
                <h3>DevOps</h3>
                <p>Docker, Kubernetes, CI/CD pipelines</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🤖</div>
                <h3>AI</h3>
                <p>Trending topics සහ tools</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">📚</div>
                <h3>Best Practices</h3>
                <p>Best practices සහ general knowledge</p>
              </div>
            </div>

            <p>
              කවුරු හරි දැනුමක් ගන්න ආවොත් කියවලා යන්න පුළුවන්. එහෙම නැත්තං මේක කෙනෙක් කියවනවද, සියයක් කියවනවද කියලා
              මං care කරන්නේ නෑ. මේක හැදුවේ දැනුම share කරන්නයි, එච්චරයි.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
