import React, { useState, useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "axios";
import "/src/styles/Dashboard.css";

const Dashboards: React.FC = () => {
  const [activeContainer, setActiveContainer] =
    useState<string>("superset-container");
  const supersetUrl = "http://11.222.333.444:8088";
  const supersetApiUrl = `${supersetUrl}/api/v1/security`;
  const dashboardId = "14f0b947-d678-4660-842d-2dd1b859aed6";
  // console.log("Superset Embedded SDK:", embedDashboard);

  useEffect(() => {
    const getToken = async () => {
      const loginBody = {
        password: "123321",
        provider: "db",
        refresh: true,
        username: "admin2",
      };
      const loginHeaders = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        // Login and get access token
        const { data } = await axios.post(
          `${supersetApiUrl}/login`,
          loginBody,
          loginHeaders
        );
        const accessToken = data.access_token;
        console.log("Access token:", accessToken);

        // Get guest token
        const guestTokenBody = {
          resources: [
            {
              type: "dashboard",
              id: dashboardId,
            },
          ],
          rls: [],
          user: {
            username: "admin",
            first_name: "admin",
            last_name: "admin",
          },
        };

        const guestTokenHeaders = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const guestTokenResponse = await axios.post(
          `${supersetApiUrl}/guest_token/`,
          guestTokenBody,
          guestTokenHeaders
        );

        const guestToken = guestTokenResponse.data.token;
        console.log("Guest token:", guestToken);

        // Embed dashboards
        const embDashboard = (containerId: string, standaloneParam: number) => {
          embedDashboard({
            id: dashboardId,
            supersetDomain: supersetUrl,
            mountPoint: document.getElementById(containerId) as HTMLElement,
            fetchGuestToken: () => guestToken,
            dashboardUiConfig: {
              filters: { expanded: true },
              urlParams: { standalone: standaloneParam },
            },
          })
            .then(() => {
              console.log(`Dashboard embedded in ${containerId}`);
            })
            .catch((error) => {
              console.error(
                `Error embedding dashboard in ${containerId}:`,
                error
              );
            });
        };

        embDashboard("superset-container", 0);
        embDashboard("superset-container1", 1);
        embDashboard("superset-container2", 2);
        embDashboard("superset-container3", 3);
      } catch (error) {
        console.error("Error fetching tokens or embedding dashboard:", error);
      }
    };

    getToken();
  }, []);

  return (
    <div>
      {/* <h1>Superset Dashboards</h1> */}
      <div className="tabs">
        <button
          className="tab"
          data-unhover="Вариант 0"
          data-hover="(default)"
          onClick={() => setActiveContainer("superset-container")}
        ></button>
        <button
          className="tab"
          data-unhover="Вариант 1"
          data-hover="(Top Navigation is hidden)"
          onClick={() => setActiveContainer("superset-container1")}
        ></button>
        <button
          className="tab"
          data-unhover="Вариант 2"
          data-hover="(Top Navigation + title is hidden)"
          onClick={() => setActiveContainer("superset-container2")}
        ></button>
        <button
          className="tab"
          data-unhover="Вариант 3"
          data-hover="(Top Navigation + title + top level tabs are hidden)"
          onClick={() => setActiveContainer("superset-container3")}
        ></button>
      </div>
      <div
        id="superset-container"
        className="dashboard-container"
        style={{
          display: activeContainer === "superset-container" ? "block" : "none",
        }}
      ></div>
      <div
        id="superset-container1"
        className="dashboard-container"
        style={{
          display: activeContainer === "superset-container1" ? "block" : "none",
        }}
      ></div>
      <div
        id="superset-container2"
        className="dashboard-container"
        style={{
          display: activeContainer === "superset-container2" ? "block" : "none",
        }}
      ></div>
      <div
        id="superset-container3"
        className="dashboard-container"
        style={{
          display: activeContainer === "superset-container3" ? "block" : "none",
        }}
      ></div>
    </div>
  );
};

export default Dashboards;
