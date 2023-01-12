import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

export const Breadcrumb = () => {
  const location = useLocation();

  const mapLocationToBreadcrumbsList = () => {
    let result = [{ name: "Home", path: "/" }];
    let items = location.pathname
      .split("/")
      .filter((item) => item !== "")
      .map((path) => {
        return {
          name: path[0].toUpperCase() + path.slice(1),
          path: "/",
        };
      });
    result = result.concat(items);

    let currentPath = "/";
    result.forEach((item, index) => {
      if (index > 0) {
        currentPath += item.name.toLowerCase() + "/";
        item.path = currentPath;
      }
    });
    return result;
  };

  return (
    <div className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <ul className="list">
          {mapLocationToBreadcrumbsList().map((item, index) => {
            return (
              <li key={index}>
                <Link underline="hover" color="inherit" to={item.path}>
                  {isNaN(String(item.name)) ? item.name : "Details"}
                </Link>
                <span>/</span>
              </li>
            );
          })}
        </ul>
      </Breadcrumbs>
    </div>
  );
};
