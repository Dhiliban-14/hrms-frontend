import "./PortalSelection.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Globe,
  Moon,
} from "lucide-react";

import logo from "../../assets/logos/logo.png";
import portalVideo from "../../assets/videos/black.mp4";

function PortalSelection() {

  const navigate = useNavigate();

  const portals = [
    {
      title: "Employee",
      description:
        "Access attendance, payroll, leave and your employee profile.",
      icon: <User size={34} />,
      active: true,
      path: "/employee/login",
    },
    {
      title: "HR",
      description:
        "Recruitment, onboarding, employee records and HR operations.",
      icon: <Users size={34} />,
      active: false,
    },
    {
      title: "Team Lead",
      description:
        "Manage your team, approve leave and monitor attendance.",
      icon: <Briefcase size={34} />,
      active: false,
    },
    {
      title: "Super Admin",
      description:
        "Manage organization, permissions and system settings.",
      icon: <ShieldCheck size={34} />,
      active: false,
    },
  ];

  return (

    <motion.div
      className="portal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

      <div className="overlay"></div>

      <div className="background-glow"></div>

      {/* ================= NAVBAR ================= */}

      <header className="portal-navbar">

        <div className="portal-logo">

          <img
            src={logo}
            alt="ZeAI Logo"
          />

        </div>

        <div className="portal-navbar-right">

          <button className="nav-icon">

            <Globe size={18} />

          </button>

          <button className="nav-icon">

            <Moon size={18} />

          </button>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <div className="portal-main">

        {/* LEFT */}

        <motion.div
          className="portal-left"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <video
            className="portal-video"
            autoPlay
            muted
            loop
            playsInline
          >

            <source
              src={portalVideo}
              type="video/mp4"
            />

          </video>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="portal-right"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <h1>

            Welcome to

            <span className="gradient-text">

              {" "}ZeAI HRMS

            </span>

          </h1>

          <p>

            Select your workspace to access your dashboard,
            manage projects, collaborate with your team,
            and streamline your daily HR operations.

          </p>

          <div className="portal-grid">

            {portals.map((portal, index) => (

              <motion.div
                key={index}
                className={`portal-card ${
                  !portal.active ? "disabled" : ""
                }`}
                whileHover={
                  portal.active
                    ? {
                        scale: 1.04,
                        y: -8,
                      }
                    : {}
                }
                whileTap={
                  portal.active
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }
                onClick={() => {

                  if (portal.active) {

                    navigate(portal.path);

                  }

                }}
              >

                <motion.div
                  className="portal-icon"
                  whileHover={{
                    rotate: 8,
                    scale: 1.12,
                  }}
                >

                  {portal.icon}

                </motion.div>

                <h2>

                  {portal.title}

                </h2>

                <p className="portal-description">

                  {portal.description}

                </p>

                <div className="portal-footer">

                  {portal.active ? (

                    <motion.div
                      className="workspace-btn"
                      whileHover={{
                        x: 5,
                      }}
                    >

                      <span>

                        Enter Workspace

                      </span>

                      <ArrowRight size={18} />

                    </motion.div>

                  ) : (

                    <span className="coming-soon">

                      Coming Soon

                    </span>

                  )}

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </motion.div>

  );

}

export default PortalSelection;