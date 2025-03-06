let sessionStart = null;
let totalUsageTime = 0;
let usageCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("omniverseFrame");
    const startTimeElem = document.getElementById("startTime");
    const endTimeElem = document.getElementById("endTime");
    const durationElem = document.getElementById("usageDuration");
    const usageHistoryTable = document.getElementById("usageHistoryTable");

    const totalUsageTimeElem = document.getElementById("totalUsageTime");
    const usageCountElem = document.getElementById("usageCount");
    const onlineStatusElem = document.getElementById("onlineStatus");

    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    // 切換頁籤
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");
        });
    });

    // 監聽 iframe 進入，記錄開始時間
    iframe.addEventListener("mouseover", () => {
        if (!sessionStart) {
            sessionStart = new Date();
            startTimeElem.textContent = sessionStart.toLocaleString();
            endTimeElem.textContent = "NAN";
            durationElem.textContent = "NAN";

            // 更新狀態為「在線」
            onlineStatusElem.textContent = "在線";
            onlineStatusElem.style.color = "green";

            // 增加使用次數
            usageCount++;
            usageCountElem.textContent = usageCount;
        }
    });

    // 當使用者離開頁面時，記錄離開時間並存入歷史紀錄
    window.addEventListener("mouseout", () => {
        if (sessionStart) {
            let sessionEnd = new Date();
            let duration = Math.floor((sessionEnd - sessionStart) / 60000);

            endTimeElem.textContent = sessionEnd.toLocaleString();
            durationElem.textContent = duration + " 分鐘";

            // 新增紀錄到歷史表格
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${sessionStart.toLocaleString()}</td>
                <td>${sessionEnd.toLocaleString()}</td>
                <td>${duration} 分鐘</td>
            `;
            usageHistoryTable.appendChild(newRow);

            // 更新總使用時長
            totalUsageTime += duration;
            totalUsageTimeElem.textContent = totalUsageTime;

            // 更新狀態為「離線」
            onlineStatusElem.textContent = "離線";
            onlineStatusElem.style.color = "red";

            // 重置 sessionStart
            sessionStart = null;
        }
    });
});
