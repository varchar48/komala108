import React from "react";
import useGoogleSheetData from "@/components/utility/useGoogleSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keywords } from "@/data/program/keywords";

const sheetTitles = {
  'Program - Day1': 'Tuesday, 8th October',
  'Program - Day2': 'Wednesday, 9th October',
};

const tabTitles = {
  'Program - Day1': 'Tuesday',
  'Program - Day2': 'Wednesday',
}

const ProgramData = () => {
  const sheetId = '1PbEeoFjiIOKic25_Po0Fr6jET2WPvpjmnvyllEn3Kv0';
  const sheetNames = ['Program - Day1', 'Program - Day2'];

  const { data, loading, error } = useGoogleSheetData(sheetId, sheetNames);

  if (loading) {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }} width="150px" height="150px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="30" cy="50" fill="#433cab" r="20">
            <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s" />
          </circle>
          <circle cx="70" cy="50" fill="#a11c7c" r="20">
            <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="0s" />
          </circle>
          <circle cx="30" cy="50" fill="#433cab" r="20">
            <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s" />
            <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }
  if (error) return <div>Error fetching data: {error.message}</div>;
  if (!data || data.length === 0) return <div>No data available.</div>;

  const groupedData = data.reduce((acc, sheet) => {
    acc[sheet.id] = sheet.data;
    return acc;
  }, {});

  const highlightText = (text) => {
    if (!text) return "";

    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, "g");
        text = text.replace(regex, `<span class="font-bold">$1</span>`);
    });

    return text.replace(/\n/g, "<br />");
};

  return (
    <div className="overflow-x-auto" style={{ padding: "20px" }}>
      <Tabs aria-label="Google Sheet Data Tabs" variant="fullWidth" defaultValue="Program - Day1" className="space-y-6">
        <TabsList className="grid grid-cols-2 bg-slate-200">
          {Object.entries(groupedData).map(([sheetName]) => (
            <TabsTrigger key={sheetName} value={sheetName}>{tabTitles[sheetName]}</TabsTrigger>
          ))}
        </TabsList>

        <div className="lg:hidden flex items-center justify-center gap-3 text-xl font-bold text-nowrap">
          Swipe to view more
          <video
            src="/lottie/arrow-swiper.mp4"
            autoPlay
            loop
            muted
            style={{ width: 50, height: 50 }}
          />
        </div>

        {Object.entries(groupedData).map(([sheetName, sheetData]) => (
          <TabsContent key={sheetName} value={sheetName} className="overflow-x-auto">
            <div>
              <h2 className="mt-0 lg:mt-10 text-2xl lg:text-3xl">{sheetTitles[sheetName]}</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }} id="program-table" className="text-center min-w-[800px]">
                <tbody>
                  {sheetData.map((row, rowIndex) => {
                    const time = row['Time'] || "";
                    const sessionB = row['Session1'] || "";
                    const sessionC = row['Session2'] || "";
                    const sessionD = row['Session3'] || "";
                    const rowClasses = row['CN'] || "";
                    const colSpan = [sessionC, sessionD].filter(val => val === "").length + 1;

                    return (
                      <tr key={rowIndex} className={rowClasses}>
                        <td style={{ border: "1px solid #ddd", minWidth: "150px", width: "150px" }}>
                          <div style={{ padding: "8px" }}>{time}</div>
                        </td>

                        <td
                          colSpan={colSpan}
                          style={{ border: "1px solid #ddd", width: colSpan === 3 ? "100%" : colSpan === 2 ? "66.66%" : "33.33%" }}
                        >
                          <div dangerouslySetInnerHTML={{ __html: highlightText(sessionB) }} style={{ padding: "8px" }} />
                        </td>

                        {sessionC && (
                          <td style={{ border: "1px solid #ddd", padding: "8px", width: "33.33%" }}>
                            <div dangerouslySetInnerHTML={{ __html: highlightText(sessionC) }} style={{ padding: "8px" }} />
                          </td>
                        )}

                        {sessionD && (
                          <td style={{ border: "1px solid #ddd", padding: "8px", width: "33.33%" }}>
                            <div dangerouslySetInnerHTML={{ __html: highlightText(sessionD) }} style={{ padding: "8px" }} />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProgramData;
