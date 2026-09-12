/**
 * IMUNOLOGIA NA PRÁTICA MÉDICA
 * Fundado pela Profª Dra. Cynthia Mafra Fonseca de Lima
 * Scripts de Interatividade e Experiência do Usuário (UX)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito de scroll no cabeçalho
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile Responsivo
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Filtro Interativo de Cursos
  const tabButtons = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Simulador de Raciocínio Clínico: Emergência em Alergia e Imunologia
  const optionButtons = document.querySelectorAll('.option-btn');
  const feedbackBox = document.getElementById('teacherFeedback');
  const feedbackText = document.getElementById('feedbackContent');

  const explanations = {
    A: {
      correct: false,
      title: "Alternativa Incorreta — A Maior Armadilha da Emergência Médica",
      text: "<strong>Por que não a Alternativa A?</strong> Administrar antialérgicos (anti-histamínicos como Prometazina) e corticoides EV como medida inicial, aguardando resposta para depois pensar em adrenalina, é o erro mais comum e fatal na anafilaxia. O corticoide demora de 4 a 6 horas para ter efeito genômico e a prometazina não reverte o choque nem o broncoespasmo, além de causar sonolência e hipotensão adicional. A adrenalina IM não deve ser atrasada em nenhuma circunstância de anafilaxia!"
    },
    B: {
      correct: true,
      title: "Resposta Correta! Conduta Ética e Salvadora de Vidas.",
      text: "<strong>Comentário da Professora Dra. Cynthia Mafra:</strong> A Adrenalina (Epinefrina) 1:1.000 por via INTRAMUSCULAR no vasto lateral da coxa é o único medicamento de <strong>primeira linha</strong> capaz de salvar a vida do paciente em anafilaxia. Ela age rapidamente nos receptores alfa-1 (revertendo o choque e o edema de glote), beta-1 (aumentando débito cardíaco) e beta-2 (broncodilatação e bloqueio da degranulação de mastócitos). Não há contraindicação absoluta ao uso de adrenalina IM na anafilaxia. Anti-histamínicos e corticoides são apenas adjuvantes de segunda linha e jamais devem retardar a adrenalina."
    },
    C: {
      correct: false,
      title: "Alternativa Incorreta — Risco Iminente de Óbito",
      text: "<strong>Por que não a Alternativa C?</strong> O paciente preenche critérios diagnósticos claros de anafilaxia (envolvimento mucocutâneo associado a comprometimento respiratório e hipotensão arterial sistêmica). Tratar apenas com broncodilatador inalatório e liberar para domicílio ignora a gravidade sistêmica e o risco de parada cardiorrespiratória por colapso vascular e asfixia."
    },
    D: {
      correct: false,
      title: "Alternativa Incorreta — O Diagnóstico é Imediatamente Clínico",
      text: "<strong>Por que não a Alternativa D?</strong> O diagnóstico de anafilaxia é estritamente clínico e tempo-dependente. A dosagem de triptase sérica serve apenas como marcador confirmatório retrospectivo (coletada preferencialmente entre 30 minutos e 2 horas do início do quadro), mas NUNCA deve retardar ou condicionar o tratamento imediato com adrenalina IM."
    }
  };

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      optionButtons.forEach(b => {
        b.classList.remove('selected', 'correct', 'incorrect');
      });

      const chosen = btn.getAttribute('data-option');
      const data = explanations[chosen];

      if (data.correct) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('incorrect');
        const correctBtn = document.querySelector('.option-btn[data-option="B"]');
        if (correctBtn) correctBtn.classList.add('correct');
      }

      if (feedbackBox && feedbackText) {
        feedbackText.innerHTML = `
          <div style="margin-bottom: 8px; font-weight: 700; color: ${data.correct ? '#065F46' : '#991B1B'}; font-size: 1rem;">
            ${data.title}
          </div>
          <p>${data.text}</p>
        `;
        feedbackBox.classList.add('show');
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 5. Formulário de Newsletter Médica (Drops de Imunologia na Prática)
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');

      if (emailInput && emailInput.value.trim() !== '') {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = 'Inscrição Confirmada!';
          submitBtn.style.backgroundColor = '#10B981';
          submitBtn.style.color = '#FFFFFF';
          emailInput.value = '';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
          }, 3500);
        }, 800);
      }
    });
  }
});
