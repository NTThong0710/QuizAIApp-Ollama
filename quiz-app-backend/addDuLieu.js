// Thêm dữ liệu mẫu
async function addSampleQuestions() {
    await Question.create([
        {
            question: "HTML là viết tắt của?",
            options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
            answer: 0,
        },
        {
            question: "CSS dùng để làm gì?",
            options: ["Tạo cấu trúc trang", "Thiết kế giao diện trang", "Tạo chức năng cho trang"],
            answer: 1,
        },
    ]);
}
addSampleQuestions();
