import { createContext, useState, useContext, useMemo, useCallback } from 'react';

/**
 * PortfolioContext
 *
 * About Me 탭과 홈 탭의 데이터를 공유하는 Context
 * - aboutMeData: 기본 정보, 섹션, 스킬 데이터
 * - getHomeData: 홈 탭에 표시할 데이터 자동 생성
 * - 성능 최적화: useMemo, useCallback 적용
 */

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: {
      name: '김기호',
      education: '조선대학교 컴퓨터공학과',
      major: '소프트웨어 개발 및 안드로이드 개발',
      experience: '강사 7년차',
      photo: ''
    },
    heroData: {
      mainTitle: 'EDUCATOR | DEVELOPER',
      subTitle: '교육과 개발을 연결하는 개발자, 김기호입니다',
      description: '7년간의 강의 경험을 바탕으로 사용자 중심의 서비스를 만듭니다',
      primaryCTA: {
        text: '프로젝트 보기',
        target: 'projects'
      },
      secondaryCTA: {
        text: '연락하기',
        target: 'contact'
      }
    },
    socialLinks: [
      {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com',
        icon: 'GitHubIcon'
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: 'LinkedInIcon'
      },
      {
        id: 'instagram',
        label: 'Instagram',
        url: 'https://instagram.com',
        icon: 'InstagramIcon'
      },
      {
        id: 'twitter',
        label: 'Twitter',
        url: 'https://twitter.com',
        icon: 'TwitterIcon'
      }
    ],
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        content: `대학에서 컴퓨터공학을 전공하며 프로그래밍의 매력에 빠졌습니다.
        처음에는 단순히 코드를 작성하는 것에 재미를 느꼈지만,
        점차 사람들에게 지식을 전달하고 함께 성장하는 것에 더 큰 보람을 느끼게 되었습니다.

        7년간 강사로 활동하면서 수백 명의 학생들과 함께 프로젝트를 진행했고,
        그들이 처음으로 앱을 출시하거나 웹사이트를 완성했을 때의 기쁨을
        함께 나누며 저 또한 성장할 수 있었습니다.

        특히 안드로이드 개발과 웹 개발 분야에서 다양한 프로젝트를 경험하며,
        이론과 실무를 연결하는 교육의 중요성을 깨달았습니다.
        지금도 최신 기술 트렌드를 학습하며, 학생들에게 실질적인 도움이 되는
        교육 콘텐츠를 만들기 위해 노력하고 있습니다.`,
        showInHome: true
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        content: `"좋은 코드는 읽기 쉬운 코드다"라는 신념을 가지고 있습니다.
        단순히 작동하는 코드를 넘어서, 유지보수가 쉽고 확장 가능한 코드를
        작성하는 것이 진정한 개발자의 역량이라고 생각합니다.

        또한 사용자 경험(UX)을 최우선으로 생각합니다.
        아무리 기술적으로 뛰어난 기능이라도 사용자가 불편하다면 의미가 없습니다.
        직관적이고 접근성이 좋은 인터페이스를 만들기 위해 항상 고민합니다.

        마지막으로 지속적인 학습의 중요성을 믿습니다.
        기술은 빠르게 변화하고, 어제의 베스트 프랙티스가 오늘은 레거시가 될 수 있습니다.
        끊임없이 배우고, 실험하고, 공유하는 것이 개발자로서 성장하는 길이라고 생각합니다.`,
        showInHome: true
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        content: `개발과 강의 외에도 다양한 활동을 즐깁니다.
        주말에는 새로운 카페를 찾아다니며 노트북으로 사이드 프로젝트를 진행하곤 합니다.
        커피 한 잔과 함께하는 코딩 시간은 저에게 최고의 힐링입니다.

        운동도 꾸준히 하려고 노력합니다.
        오랜 시간 앉아서 일하는 직업이다 보니 건강 관리가 중요하다는 것을
        깨닫고, 요즘은 주 3회 이상 헬스장을 다니고 있습니다.

        또한 독서를 좋아해서 기술 서적뿐만 아니라 인문학, 자기계발서도 자주 읽습니다.
        다양한 분야의 지식이 때로는 개발 문제를 해결하는 데
        새로운 관점을 제공해주기도 합니다.

        최근에는 오픈소스 프로젝트에도 관심을 가지고 있습니다.
        작은 기여라도 커뮤니티에 도움이 되고,
        전 세계 개발자들과 협업하는 경험은 정말 값진 배움이 됩니다.`,
        showInHome: false
      }
    ],
    skills: [
      { id: 1, icon: '🔶', name: 'HTML', level: 80, category: 'Frontend', description: '시맨틱 마크업과 웹 접근성을 고려한 HTML 작성', showInHome: true },
      { id: 2, icon: '🎨', name: 'CSS', level: 75, category: 'Frontend', description: 'Flexbox, Grid를 활용한 반응형 레이아웃 구현', showInHome: true },
      { id: 3, icon: '⚡', name: 'JavaScript', level: 70, category: 'Frontend', description: 'ES6+ 문법과 비동기 프로그래밍', showInHome: true },
      { id: 4, icon: '⚛️', name: 'React', level: 60, category: 'Framework', description: 'Hooks와 컴포넌트 기반 개발', showInHome: false },
      { id: 5, icon: '🎯', name: 'Figma', level: 65, category: 'Design', description: 'UI/UX 디자인과 프로토타이핑', showInHome: false },
      { id: 6, icon: '🟢', name: 'Node.js', level: 55, category: 'Backend', description: 'Express를 활용한 REST API 구축', showInHome: false },
      { id: 7, icon: '📱', name: 'Android', level: 70, category: 'Mobile', description: 'Kotlin과 Jetpack을 활용한 안드로이드 앱 개발', showInHome: true },
      { id: 8, icon: '🐙', name: 'Git', level: 75, category: 'Tools', description: '버전 관리와 협업 워크플로우', showInHome: true }
    ]
  });

  /**
   * 홈 탭용 데이터 자동 생성 (useMemo로 최적화)
   *
   * @returns {Object} 홈 탭에 표시할 데이터
   *   - content: showInHome이 true인 섹션들의 요약
   *   - skills: showInHome이 true인 스킬들 (level 높은 순)
   *   - topSkills: 전체 스킬 중 상위 4개
   *   - basicInfo: 기본 정보
   */
  const homeData = useMemo(() => {
    // showInHome이 true인 섹션들만 필터링하고 요약 생성
    const homeContent = aboutMeData.sections
      .filter(section => section.showInHome)
      .map(section => ({
        id: section.id,
        title: section.title,
        summary: section.content.trim().split('\n')[0].substring(0, 150) + '...',
        fullContent: section.content
      }));

    // showInHome이 true인 스킬들 (level 높은 순)
    const homeSkills = aboutMeData.skills
      .filter(skill => skill.showInHome)
      .sort((a, b) => b.level - a.level);

    // 전체 스킬 중 상위 4개 (홈 탭 스킬 섹션용)
    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return {
      content: homeContent,
      skills: homeSkills,
      topSkills: topSkills,
      basicInfo: aboutMeData.basicInfo
    };
  }, [aboutMeData]);

  /**
   * homeData를 반환하는 함수 (useCallback로 최적화)
   */
  const getHomeData = useCallback(() => homeData, [homeData]);

  /**
   * aboutMeData 업데이트 함수 (useCallback로 최적화)
   *
   * @param {Object} newData - 새로운 데이터
   */
  const updateAboutMeData = useCallback((newData) => {
    setAboutMeData(newData);
  }, []);

  const value = useMemo(() => ({
    aboutMeData,
    setAboutMeData: updateAboutMeData,
    getHomeData
  }), [aboutMeData, updateAboutMeData, getHomeData]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * usePortfolio Hook
 *
 * Context를 쉽게 사용하기 위한 커스텀 훅
 *
 * Example usage:
 * const { aboutMeData, getHomeData } = usePortfolio();
 */
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
