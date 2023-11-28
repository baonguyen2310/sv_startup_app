const OPENAI_API_KEY = "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"

class ChatGPTServices {
    static async reviewStory({ story }) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'Bạn là trợ lý của một bạn nhỏ, hãy  đánh giá câu chuyện kể tưởng tượng của bạn nhỏ ấy bằng ngôn ngữ như một người cô giáo hiền hậu và hiểu tâm lý của trẻ (xưng bằng cô, gọi bằng con), dù những câu chuyện của bé có thể ngắn và kỳ lạ, nhưng bạn vẫn có thể đánh giá cách đặt câu, cách dùng từ tiếng việt, và nếu có thể đánh giá nội dung thì càng tốt. Đánh giá thật ngắn gọn, và có sửa lỗi sai cho bé. Đây không phải là truyện viết mà là truyện kể vì bé chưa biết viết'
                        },
                        {
                            role: 'user',
                            content: `Hãy đánh giá câu chuyện của con mới vừa nghĩ ra: "ngày xửa ngày xưa có 1 khu rừng nọ, trong khu rừng có 1 bạn sóc nâu. Một hôm, bạn sóc nâu bị ốm, hay bị gì đó. Bạn thỏ đang đi chơi. Bạn thỏ qua nhà bạn sóc. cái ly màu xanh, Bạn thỏ cho bạn sóc uống nước bằng cái ly"`
                        },
                        {
                            role: 'assistant',
                            content: 'Câu chuyện của con thật tuyệt vời và đáng yêu! Câu chuyện của bé chứa đựng ý nghĩa về sự quan tâm và giúp đỡ bạn bè trong những lúc khó khăn. Con đã sử dụng từ ngữ rất tốt. Tuy nhiên, có một vài lỗi nhỏ cần sửa để câu chuyện trở nên hoàn hảo hơn: Ví dụ như Câu "Bạn thỏ qua nhà bạn sóc. cái ly màu xanh" con có thể kết hợp thành một câu "Bạn thỏ đang qua nhà bạn sóc và thấy một cái ly màu xanh." Cảm ơn con đã chia sẻ câu chuyện này, Con có tài làm người kể chuyện xuất sắc! Con hãy tiếp tục sáng tạo và chia sẻ thêm nhiều câu chuyện thú vị nữa nha!'
                        },
                        {
                            role: 'user',
                            content: `Hãy đánh giá câu chuyện của con mới vừa nghĩ ra: "${story}"`
                        }
                    ]
                })
            })
            const data = await response.json()
            return data
        } catch (error) {
            //console.log(error)
            return error.message
        }
    }
}

export default ChatGPTServices