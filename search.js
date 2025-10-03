async function fetchData() {
  const number = document.getElementById("phone").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!number) {
    resultDiv.innerHTML = "<div style='color:#ff4d6d;'>⚠️ Please enter valid input.</div>";
    return;
  }

  resultDiv.innerHTML = "⏳ Fetching VIP Data...";

  try {
    // call Vercel proxy API with hidden token
    const res = await fetch(`/api/proxy?num=${encodeURIComponent(number)}`);
    const json = await res.json();

    if (!json.data || !Array.isArray(json.data)) {
      resultDiv.innerHTML = "<div style='color:#ff4d6d;'>❌ No Data Found ❌</div>";
      return;
    }
    showResults(json.data, resultDiv);
  } catch (err) {
    resultDiv.innerHTML = "<div style='color:#ff4d6d;'>❌ Server Error</div>";
  }
}

function showResults(dataArray, resultDiv) {
  let html = "";
  let count = 0;
  for (const entry of dataArray) {
    count++;
    const mobile = entry.Mobile || "N/A";
    const name = entry.Name || "N/A";
    const cnic = entry.CNIC || "N/A";
    const address = entry.Address || "N/A";

    html += `
      <div class="sim-card">
        <div class="sim-header">
          ⭐ Result ${count}
          <div>
            <button class="copy-btn" onclick="copyResult('${mobile}','${name}','${cnic}','${address}')">📋</button>
            <button class="print-btn" onclick="printResult('${mobile}','${name}','${cnic}','${address}')">🖨️</button>
          </div>
        </div>
        📞 <b>Mobile:</b> ${mobile}<br>
        👤 <b>Name:</b> ${name}<br>
        🆔 <b>CNIC:</b> ${cnic}<br>
        📍 <b>Address:</b> ${address}
      </div>`;
  }
  resultDiv.innerHTML = html;
}

function copyResult(mobile, name, cnic, address) {
  const text = `📞 Mobile: ${mobile}\n👤 Name: ${name}\n🆔 CNIC: ${cnic}\n📍 Address: ${address}`;
  navigator.clipboard.writeText(text);
  showToast("✅ Copied to Clipboard!");
}

function printResult(mobile, name, cnic, address) {
  const content = `
    Mobile: ${mobile}\n
    Name: ${name}\n
    CNIC: ${cnic}\n
    Address: ${address}
  `;
  const printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write("<pre>" + content + "</pre>");
  printWindow.document.close();
  printWindow.print();
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}
