import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // use your Axios instance
import "../css/homePage.css";

const HomePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects");
        setSubjects(res.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (isLoading) return <p>Loading subjects...</p>;
  if (subjects.length === 0) return <p>No subjects available.</p>;

  return (
    <div className="homePage">
      <h2>Your Subjects</h2>
      <div className="subjectsGrid">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="subjectCard"
            onClick={() => navigate(`/subject/${subject._id}`)}
          >
            <h3>{subject.name}</h3>
            {subject.description && <p>{subject.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
