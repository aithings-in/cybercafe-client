export interface ServiceDetail {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  features: string[];
  benefits: string[];
  process?: string[];
  pricing?: {
    basic?: string;
    professional?: string;
    enterprise?: string;
  };
}

export const servicesData: ServiceDetail[] = [
  {
    id: 1,
    title: "Typing Master",
    shortDescription:
      "Comprehensive cybersecurity training programs to educate your team on the latest threats and best practices.",
    fullDescription:
      "Our Training and Awareness programs are designed to empower your organization with the knowledge and skills needed to defend against cyber threats. We offer comprehensive training sessions covering everything from basic security hygiene to advanced threat detection. Our expert instructors use real-world scenarios and hands-on exercises to ensure your team is well-prepared to handle any security challenge.",
    image: "/images/typing.jpg",
    imageAlt: "Cybersecurity training session",
    features: [
      "Interactive training sessions",
      "Real-world scenario simulations",
      "Customized curriculum for your industry",
      "Regular security awareness updates",
      "Phishing simulation exercises",
      "Compliance training modules",
    ],
    benefits: [
      "Reduced security incidents by up to 70%",
      "Improved employee security awareness",
      "Compliance with industry regulations",
      "Enhanced incident response capabilities",
      "Cost-effective security investment",
    ],
    process: [
      "Initial assessment of your security needs",
      "Customized training program development",
      "Interactive training delivery",
      "Regular progress assessments",
      "Ongoing support and updates",
    ],
  },
  {
    id: 2,
    title: "telly GST",
    shortDescription:
      "Comprehensive security assessments to identify vulnerabilities in your systems before attackers do.",
    fullDescription:
      "Our Penetration Testing services provide a thorough security assessment of your IT infrastructure, applications, and networks. Our certified ethical hackers simulate real-world attacks to identify vulnerabilities that could be exploited by malicious actors. We follow industry-standard methodologies and provide detailed reports with actionable recommendations to strengthen your security posture.",
    image: "/images/telly.jpg",
    imageAlt: "Security testing professional",
    features: [
      "Network penetration testing",
      "Web application security testing",
      "Mobile app security assessment",
      "Social engineering testing",
      "Wireless network security",
      "Compliance-focused testing (PCI DSS, HIPAA, etc.)",
    ],
    benefits: [
      "Identify vulnerabilities before attackers",
      "Meet compliance requirements",
      "Improve security posture",
      "Reduce risk of data breaches",
      "Detailed remediation guidance",
    ],
    process: [
      "Scoping and planning",
      "Reconnaissance and information gathering",
      "Vulnerability identification",
      "Exploitation and validation",
      "Reporting and recommendations",
      "Remediation support",
    ],
  },
  {
    id: 3,
    title: "Graphic Designing Training",
    shortDescription:
      "Protect your network infrastructure with advanced security solutions and monitoring.",
    fullDescription:
      "Our Networking Security services ensure your network infrastructure is protected against modern threats. We design, implement, and manage comprehensive network security solutions including firewalls, intrusion detection systems, and network segmentation. Our team continuously monitors your network for suspicious activities and responds quickly to potential threats.",
    image: "/images/graphicDesign.jpg",
    imageAlt: "Network security professional",
    features: [
      "Firewall configuration and management",
      "Intrusion Detection and Prevention Systems (IDPS)",
      "Network segmentation and isolation",
      "VPN and remote access security",
      "Network traffic analysis",
      "24/7 network monitoring",
    ],
    benefits: [
      "Enhanced network protection",
      "Reduced attack surface",
      "Improved network performance",
      "Compliance with security standards",
      "Proactive threat detection",
    ],
    process: [
      "Network security assessment",
      "Security architecture design",
      "Implementation and configuration",
      "Continuous monitoring",
      "Regular security updates",
      "Incident response support",
    ],
  },
  {
    id: 4,
    title: "Excel Training",
    shortDescription:
      "Expert management of your firewall infrastructure to ensure optimal protection.",
    fullDescription:
      "Our Managed Firewall service provides comprehensive firewall management, monitoring, and maintenance. We handle all aspects of your firewall infrastructure, from initial configuration to ongoing rule management and updates. Our team ensures your firewall policies are optimized for both security and performance.",
    image: "/images/excel.jpg",
    imageAlt: "Managed firewall service",
    features: [
      "24/7 firewall monitoring",
      "Rule optimization and management",
      "Threat intelligence integration",
      "Regular security updates",
      "Performance optimization",
      "Compliance reporting",
    ],
    benefits: [
      "Expert firewall management",
      "Reduced security risks",
      "Improved network performance",
      "Cost-effective solution",
      "Compliance assurance",
    ],
  },
  {
    id: 5,
    title: "AutoCAD Training",
    shortDescription:
      "Access to expert Chief Information Security Officer services without the full-time cost.",
    fullDescription:
      "Our Virtual CISO (vCISO) service provides organizations with strategic cybersecurity leadership and expertise. We act as your security executive, developing security strategies, managing security programs, and ensuring compliance with industry regulations. Perfect for organizations that need CISO-level expertise but don't require a full-time executive.",
    image: "/images/autocad.jpeg",
    imageAlt: "Virtual CISO service",
    features: [
      "Strategic security planning",
      "Security program development",
      "Risk assessment and management",
      "Compliance oversight",
      "Security policy development",
      "Board-level reporting",
    ],
    benefits: [
      "Access to expert security leadership",
      "Cost-effective CISO services",
      "Strategic security guidance",
      "Compliance management",
      "Flexible engagement model",
    ],
  },
  {
    id: 6,
    title: "ADCA Training",
    shortDescription:
      "Comprehensive security solutions for your cloud infrastructure and applications.",
    fullDescription:
      "Our Cloud Security services protect your cloud-based assets across all major cloud platforms. We provide security assessments, configuration reviews, and ongoing monitoring to ensure your cloud infrastructure is secure. Our experts help you implement cloud security best practices and maintain compliance with cloud security standards.",
    image: "/images/adca.jpeg",
    imageAlt: "Cloud security service",
    features: [
      "Cloud security assessment",
      "Configuration review and hardening",
      "Identity and access management",
      "Data encryption and protection",
      "Cloud compliance (SOC 2, ISO 27001)",
      "Continuous cloud monitoring",
    ],
    benefits: [
      "Secure cloud deployments",
      "Compliance with cloud standards",
      "Reduced cloud security risks",
      "Optimized cloud security costs",
      "Expert cloud security guidance",
    ],
  },
];

export function getServiceById(id: number): ServiceDetail | undefined {
  return servicesData.find((service) => service.id === id);
}

export function getAllServices(): ServiceDetail[] {
  return servicesData;
}
