/* =========================================
   Krishi Mitra - AI Engine
   Advanced Crop Recommendation System
   ========================================= */

// AI Engine Class
class KrishiMitraAI {
    constructor() {
        this.cropDatabase = this.initializeCropDatabase();
        this.weatherAPI = 'https://api.openweathermap.org/data/2.5/weather'; // Mock API
        this.soilDataAPI = 'https://api.krishimitra.com/soil'; // Mock API
        this.marketAPI = 'https://api.krishimitra.com/market'; // Mock API
        this.modelAccuracy = 0.958; // 95.8% accuracy
        
        this.initializeAI();
    }
    
    initializeAI() {
        console.log('🤖 Krishi Mitra AI Engine initialized');
        this.setupEventListeners();
        this.initializeChatbot();
    }
    
    // =====================================
    // CROP DATABASE
    // =====================================
    
    initializeCropDatabase() {
        return {
            'ashwagandha': {
                name_hindi: 'अश्वगंधा',
                name_english: 'Ashwagandha',
                category: 'medicinal',
                initial_investment: 25000,
                annual_revenue: 300000,
                annual_cost: 25000,
                net_profit: 275000,
                roi_percent: 1100,
                harvest_time_months: 6,
                productive_years: 1,
                growing_season: 'Kharif (June-July)',
                soil_requirements: {
                    ph_min: 6.5,
                    ph_max: 8.0,
                    nitrogen: 'medium',
                    phosphorus: 'medium',
                    potassium: 'high',
                    organic_matter: 'high'
                },
                climate_requirements: {
                    temp_min: 20,
                    temp_max: 38,
                    rainfall_min: 500,
                    rainfall_max: 750,
                    humidity: 'low-medium'
                },
                water_requirement: 'low',
                market_demand: 'very_high',
                difficulty_level: 'easy',
                uses: 'Ayurvedic medicines, immunity boosters, export to US/Europe',
                government_subsidy: {
                    scheme: 'National Medicinal Plants Board',
                    percentage: 75,
                    max_amount: 50000
                },
                success_rate: 0.89,
                market_price_per_kg: 1200,
                export_potential: 'very_high'
            },
            
            'bamboo': {
                name_hindi: 'बांस',
                name_english: 'Bamboo',
                category: 'trees',
                initial_investment: 60000,
                annual_revenue: 860000, // From 5th year
                annual_cost: 40000,
                net_profit: 820000,
                roi_percent: 1433,
                harvest_time_months: 60, // 5 years first harvest
                productive_years: 50,
                growing_season: 'Monsoon (June-July)',
                soil_requirements: {
                    ph_min: 5.5,
                    ph_max: 8.5,
                    nitrogen: 'any',
                    phosphorus: 'any',
                    potassium: 'any',
                    organic_matter: 'medium'
                },
                climate_requirements: {
                    temp_min: 8,
                    temp_max: 42,
                    rainfall_min: 400,
                    rainfall_max: 2500,
                    humidity: 'any'
                },
                water_requirement: 'very_low',
                market_demand: 'extremely_high',
                difficulty_level: 'medium',
                uses: 'Construction, paper, furniture, biomass, carbon credits',
                government_subsidy: {
                    scheme: 'National Bamboo Mission',
                    percentage: 60,
                    max_amount: 120000
                },
                success_rate: 0.94,
                market_price_per_tonne: 8000,
                export_potential: 'extremely_high'
            },
            
            'dragon_fruit': {
                name_hindi: 'ड्रैगन फ्रूट',
                name_english: 'Dragon Fruit',
                category: 'exotic',
                initial_investment: 200000,
                annual_revenue: 500000,
                annual_cost: 50000,
                net_profit: 450000,
                roi_percent: 225,
                harvest_time_months: 18,
                productive_years: 25,
                growing_season: 'Year round (7 harvests/year)',
                soil_requirements: {
                    ph_min: 6.0,
                    ph_max: 7.0,
                    nitrogen: 'medium',
                    phosphorus: 'high',
                    potassium: 'high',
                    organic_matter: 'high'
                },
                climate_requirements: {
                    temp_min: 20,
                    temp_max: 35,
                    rainfall_min: 600,
                    rainfall_max: 1200,
                    humidity: 'medium'
                },
                water_requirement: 'medium',
                market_demand: 'very_high',
                difficulty_level: 'medium',
                uses: 'Fresh fruit, health food, export',
                government_subsidy: {
                    scheme: 'Exotic Fruit Development',
                    percentage: 50,
                    max_amount: 30000
                },
                success_rate: 0.78,
                market_price_per_kg: 350,
                export_potential: 'high'
            },
            
            'strawberry': {
                name_hindi: 'स्ट्रॉबेरी',
                name_english: 'Strawberry',
                category: 'exotic',
                initial_investment: 80000,
                annual_revenue: 600000,
                annual_cost: 120000,
                net_profit: 480000,
                roi_percent: 600,
                harvest_time_months: 4,
                productive_years: 3,
                growing_season: 'Winter (Oct-Mar)',
                soil_requirements: {
                    ph_min: 5.5,
                    ph_max: 6.5,
                    nitrogen: 'high',
                    phosphorus: 'high',
                    potassium: 'high',
                    organic_matter: 'very_high'
                },
                climate_requirements: {
                    temp_min: 15,
                    temp_max: 25,
                    rainfall_min: 300,
                    rainfall_max: 400,
                    humidity: 'medium-high'
                },
                water_requirement: 'high',
                market_demand: 'very_high',
                difficulty_level: 'high',
                uses: 'Fresh fruit, processing, export',
                government_subsidy: {
                    scheme: 'Horticulture Mission',
                    percentage: 50,
                    max_amount: 40000
                },
                success_rate: 0.72,
                market_price_per_kg: 200,
                export_potential: 'high'
            },
            
            'aloe_vera': {
                name_hindi: 'घृतकुमारी',
                name_english: 'Aloe Vera',
                category: 'medicinal',
                initial_investment: 15000,
                annual_revenue: 120000,
                annual_cost: 15000,
                net_profit: 105000,
                roi_percent: 700,
                harvest_time_months: 8,
                productive_years: 5,
                growing_season: 'All year',
                soil_requirements: {
                    ph_min: 6.0,
                    ph_max: 8.5,
                    nitrogen: 'low',
                    phosphorus: 'medium',
                    potassium: 'medium',
                    organic_matter: 'medium'
                },
                climate_requirements: {
                    temp_min: 18,
                    temp_max: 45,
                    rainfall_min: 200,
                    rainfall_max: 400,
                    humidity: 'low-medium'
                },
                water_requirement: 'very_low',
                market_demand: 'high',
                difficulty_level: 'very_easy',
                uses: 'Cosmetics, pharmaceuticals, health products',
                government_subsidy: {
                    scheme: 'Medicinal Plants Scheme',
                    percentage: 50,
                    max_amount: 25000
                },
                success_rate: 0.91,
                market_price_per_kg: 25,
                export_potential: 'medium'
            },
            
            'tulsi': {
                name_hindi: 'तुलसी',
                name_english: 'Tulsi',
                category: 'medicinal',
                initial_investment: 20000,
                annual_revenue: 50000,
                annual_cost: 20000,
                net_profit: 30000,
                roi_percent: 150,
                harvest_time_months: 3,
                productive_years: 4,
                growing_season: 'All year',
                soil_requirements: {
                    ph_min: 6.0,
                    ph_max: 7.5,
                    nitrogen: 'medium',
                    phosphorus: 'medium',
                    potassium: 'medium',
                    organic_matter: 'high'
                },
                climate_requirements: {
                    temp_min: 20,
                    temp_max: 35,
                    rainfall_min: 500,
                    rainfall_max: 1000,
                    humidity: 'medium'
                },
                water_requirement: 'medium',
                market_demand: 'high',
                difficulty_level: 'easy',
                uses: 'Herbal teas, essential oils, Ayurvedic medicines',
                government_subsidy: {
                    scheme: 'Medicinal Plants Development',
                    percentage: 40,
                    max_amount: 15000
                },
                success_rate: 0.87,
                market_price_per_kg: 80,
                export_potential: 'medium'
            },
            
            'mint': {
                name_hindi: 'पुदीना',
                name_english: 'Mint',
                category: 'aromatic',
                initial_investment: 25750,
                annual_revenue: 70000,
                annual_cost: 25750,
                net_profit: 44250,
                roi_percent: 172,
                harvest_time_months: 4,
                productive_years: 4,
                growing_season: 'June-July',
                soil_requirements: {
                    ph_min: 6.5,
                    ph_max: 7.0,
                    nitrogen: 'high',
                    phosphorus: 'medium',
                    potassium: 'medium',
                    organic_matter: 'high'
                },
                climate_requirements: {
                    temp_min: 20,
                    temp_max: 30,
                    rainfall_min: 600,
                    rainfall_max: 800,
                    humidity: 'high'
                },
                water_requirement: 'high',
                market_demand: 'very_high',
                difficulty_level: 'medium',
                uses: 'Essential oil, pharmaceutical, food flavoring',
                government_subsidy: {
                    scheme: 'Aromatic Plants Scheme',
                    percentage: 30,
                    max_amount: 20000
                },
                success_rate: 0.83,
                market_price_per_kg: 600,
                export_potential: 'high'
            }
        };
    }
    
    // =====================================
    // AI RECOMMENDATION ENGINE
    // =====================================
    
    async generateRecommendation(farmerData) {
        console.log('🧠 Generating AI recommendations...');
        
        try {
            // Simulate API call delay
            await this.sleep(2000);
            
            // Get eligible crops based on investment
            const eligibleCrops = this.filterEligibleCrops(farmerData);
            
            // Score each crop
            const scoredCrops = this.scoreCrops(eligibleCrops, farmerData);
            
            // Sort by score and return top 3
            const recommendations = scoredCrops
                .sort((a, b) => b.ai_score - a.ai_score)
                .slice(0, 3);
            
            // Calculate portfolio optimization
            const portfolio = this.optimizePortfolio(recommendations, farmerData);
            
            // Generate wealth projection
            const wealthProjection = this.calculateWealthProjection(portfolio, 10);
            
            // Get government subsidies
            const subsidies = this.getAvailableSubsidies(recommendations, farmerData);
            
            return {
                recommendations: recommendations,
                portfolio: portfolio,
                wealthProjection: wealthProjection,
                subsidies: subsidies,
                confidence: this.modelAccuracy,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            throw new Error('Failed to generate recommendations');
        }
    }
    
    filterEligibleCrops(farmerData) {
        const eligible = [];
        const categories = farmerData.categories || ['medicinal', 'exotic', 'trees', 'aromatic'];
        const investment = farmerData.investment || 50000;
        
        Object.keys(this.cropDatabase).forEach(cropKey => {
            const crop = this.cropDatabase[cropKey];
            
            // Filter by category
            if (!categories.includes(crop.category)) return;
            
            // Filter by investment capacity
            if (crop.initial_investment > investment * 1.2) return; // Allow 20% flexibility
            
            // Add to eligible list
            eligible.push({
                ...crop,
                crop_id: cropKey
            });
        });
        
        return eligible;
    }
    
    scoreCrops(crops, farmerData) {
        return crops.map(crop => {
            let score = 0;
            
            // ROI Score (30% weight)
            const roiScore = Math.min(crop.roi_percent / 1500, 1.0);
            score += roiScore * 0.30;
            
            // Investment Fit Score (25% weight)
            const investmentRatio = crop.initial_investment / farmerData.investment;
            const investmentScore = investmentRatio <= 1.0 ? (2 - investmentRatio) : 0.5;
            score += Math.min(investmentScore, 1.0) * 0.25;
            
            // Time Horizon Fit Score (20% weight)
            const timeHorizon = farmerData.timeHorizon || 3;
            const maturityYears = crop.harvest_time_months / 12;
            const timeScore = timeHorizon >= maturityYears ? 1.0 : 0.6;
            score += timeScore * 0.20;
            
            // Soil Compatibility Score (15% weight)
            const soilScore = this.calculateSoilCompatibility(crop, farmerData);
            score += soilScore * 0.15;
            
            // Market Demand Score (10% weight)
            const marketScores = {
                'extremely_high': 1.0,
                'very_high': 0.9,
                'high': 0.7,
                'medium': 0.5,
                'low': 0.3
            };
            const marketScore = marketScores[crop.market_demand] || 0.5;
            score += marketScore * 0.10;
            
            return {
                ...crop,
                ai_score: score
            };
        });
    }
    
    calculateSoilCompatibility(crop, farmerData) {
        // Simulate soil compatibility calculation
        // In production, this would use actual soil test data
        const farmState = farmerData.state || 'UP';
        const farmSize = farmerData.farmSize || 'medium';
        
        // State-based soil compatibility
        const stateCompatibility = {
            'UP': { ashwagandha: 0.9, bamboo: 0.8, aloe_vera: 0.7 },
            'MP': { ashwagandha: 0.95, bamboo: 0.9, aloe_vera: 0.8 },
            'RJ': { aloe_vera: 0.9, ashwagandha: 0.8, bamboo: 0.6 },
            'PB': { mint: 0.9, strawberry: 0.8, bamboo: 0.7 },
            'MH': { dragon_fruit: 0.9, strawberry: 0.8, bamboo: 0.8 }
        };
        
        return stateCompatibility[farmState]?.[crop.crop_id] || 0.7;
    }
    
    optimizePortfolio(recommendations, farmerData) {
        const investment = farmerData.investment;
        const timeHorizon = farmerData.timeHorizon || 3;
        
        // Portfolio allocation strategy
        const portfolio = {
            total_investment: investment,
            crops: [],
            risk_level: 'medium',
            expected_roi: 0
        };
        
        // Allocate investment across top crops
        let remainingInvestment = investment;
        let totalExpectedProfit = 0;
        
        recommendations.forEach((crop, index) => {
            if (remainingInvestment <= 0) return;
            
            // Allocation percentage based on ranking and available funds
            const allocationPercentages = [0.5, 0.3, 0.2]; // 50%, 30%, 20%
            const allocatedAmount = Math.min(
                investment * allocationPercentages[index],
                remainingInvestment,
                crop.initial_investment
            );
            
            if (allocatedAmount >= crop.initial_investment) {
                portfolio.crops.push({
                    ...crop,
                    allocated_investment: allocatedAmount,
                    area_acres: allocatedAmount / crop.initial_investment,
                    expected_annual_profit: crop.net_profit * (allocatedAmount / crop.initial_investment)
                });
                
                remainingInvestment -= allocatedAmount;
                totalExpectedProfit += crop.net_profit * (allocatedAmount / crop.initial_investment);
            }
        });
        
        portfolio.expected_annual_profit = totalExpectedProfit;
        portfolio.expected_roi = (totalExpectedProfit / investment) * 100;
        
        return portfolio;
    }
    
    calculateWealthProjection(portfolio, years) {
        const projection = [];
        let cumulativeWealth = portfolio.total_investment;
        
        for (let year = 0; year <= years; year++) {
            let yearlyIncome = 0;
            let yearlyExpenses = 0;
            
            portfolio.crops.forEach(crop => {
                const maturityYears = crop.harvest_time_months / 12;
                
                if (year >= maturityYears) {
                    yearlyIncome += crop.expected_annual_profit;
                    yearlyExpenses += crop.annual_cost * crop.area_acres;
                }
            });
            
            const netProfit = yearlyIncome - yearlyExpenses;
            cumulativeWealth += netProfit;
            
            projection.push({
                year: year,
                yearly_income: yearlyIncome,
                yearly_expenses: yearlyExpenses,
                net_profit: netProfit,
                cumulative_wealth: cumulativeWealth,
                roi_multiplier: cumulativeWealth / portfolio.total_investment
            });
        }
        
        return projection;
    }
    
    getAvailableSubsidies(recommendations, farmerData) {
        const subsidies = [];
        
        recommendations.forEach(crop => {
            if (crop.government_subsidy) {
                subsidies.push({
                    crop: crop.name_hindi,
                    scheme: crop.government_subsidy.scheme,
                    percentage: crop.government_subsidy.percentage,
                    max_amount: crop.government_subsidy.max_amount,
                    eligible_amount: Math.min(
                        crop.initial_investment * (crop.government_subsidy.percentage / 100),
                        crop.government_subsidy.max_amount
                    )
                });
            }
        });
        
        return subsidies;
    }
    
    // =====================================
    // CHATBOT ENGINE
    // =====================================
    
    initializeChatbot() {
        this.chatHistory = [];
        this.setupChatInterface();
        this.loadKnowledgeBase();
    }
    
    setupChatInterface() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-chat');
        const chatMessages = document.getElementById('chat-messages');
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.handleChatMessage());
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleChatMessage();
                }
            });
        }
        
        // Add initial bot message
        if (chatMessages) {
            this.addChatMessage(
                currentLanguage === 'hindi' 
                    ? 'नमस्ते! मैं आपका AI कृषि सहायक हूं। आपकी खेती से जुड़े सवाल पूछें।'
                    : 'Hello! I\'m your AI agriculture assistant. Ask me any farming questions.',
                'bot'
            );
        }
    }
    
    loadKnowledgeBase() {
        this.knowledgeBase = {
            greetings: [
                'hello', 'hi', 'namaste', 'namaskar', 'good morning', 'good evening'
            ],
            crops: Object.keys(this.cropDatabase),
            topics: {
                'roi': ['profit', 'return', 'investment', 'income', 'earning', 'munafa', 'faayda'],
                'subsidy': ['government scheme', 'sarkaari yojana', 'subsidy', 'sahayata'],
                'weather': ['weather', 'mausam', 'temperature', 'barish', 'rainfall'],
                'soil': ['soil', 'mitti', 'ph', 'nitrogen', 'phosphorus', 'potassium'],
                'harvest': ['harvest', 'katai', 'crop ready', 'maturity', 'pakna']
            }
        };
        
        this.responses = {
            greeting_hindi: [
                'नमस्ते! मैं आपकी खेती में मदद करने के लिए यहां हूं।',
                'आपका स्वागत है! कैसे मदद कर सकता हूं?',
                'हैलो! आज आप कौन सी फसल के बारे में जानना चाहते हैं?'
            ],
            greeting_english: [
                'Hello! I\'m here to help with your farming needs.',
                'Welcome! How can I assist you today?',
                'Hi! What crop would you like to know about today?'
            ],
            roi_hindi: [
                'ROI के लिए अश्वगंधा (1100%), बांस (1433%), या एलो वेरा (700%) सबसे अच्छे विकल्प हैं।',
                'सबसे ज्यादा मुनाफा बांस की खेती में है - 5 साल बाद 1433% ROI मिलता है।'
            ],
            roi_english: [
                'For highest ROI, consider Ashwagandha (1100%), Bamboo (1433%), or Aloe Vera (700%).',
                'Bamboo farming gives maximum profit - 1433% ROI after 5 years.'
            ],
            subsidy_hindi: [
                'राष्ट्रीय औषधीय पौधा बोर्ड से अश्वगंधा पर 75% सब्सिडी मिलती है।',
                'बांस की खेती के लिए राष्ट्रीय बांस मिशन से ₹1.2 लाख तक सहायता मिलती है।'
            ],
            subsidy_english: [
                'National Medicinal Plants Board offers 75% subsidy on Ashwagandha.',
                'National Bamboo Mission provides up to ₹1.2 lakh support for bamboo farming.'
            ],
            default_hindi: [
                'मुझे इस बारे में और जानकारी चाहिए। क्या आप अधिक विस्तार से बता सकते हैं?',
                'यह दिलचस्प सवाल है। AI रेकमेंडेशन टूल का इस्तेमाल करके मैं आपको बेहतर सुझाव दे सकता हूं।'
            ],
            default_english: [
                'I need more information about this. Can you provide more details?',
                'That\'s an interesting question. I can give you better suggestions using the AI recommendation tool.'
            ]
        };
    }
    
    async handleChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and get response
        setTimeout(async () => {
            const response = await this.processUserMessage(message);
            this.removeTypingIndicator();
            this.addChatMessage(response, 'bot');
        }, 1000 + Math.random() * 2000); // Simulate thinking time
    }
    
    async processUserMessage(message) {
        const lowercaseMessage = message.toLowerCase();
        const language = currentLanguage;
        
        // Check for greetings
        if (this.knowledgeBase.greetings.some(greeting => lowercaseMessage.includes(greeting))) {
            return this.getRandomResponse(`greeting_${language}`);
        }
        
        // Check for ROI/profit related questions
        if (this.knowledgeBase.topics.roi.some(keyword => lowercaseMessage.includes(keyword))) {
            return this.getRandomResponse(`roi_${language}`);
        }
        
        // Check for subsidy related questions
        if (this.knowledgeBase.topics.subsidy.some(keyword => lowercaseMessage.includes(keyword))) {
            return this.getRandomResponse(`subsidy_${language}`);
        }
        
        // Check if asking about specific crop
        const mentionedCrop = this.knowledgeBase.crops.find(crop => 
            lowercaseMessage.includes(crop) || 
            lowercaseMessage.includes(this.cropDatabase[crop].name_hindi) ||
            lowercaseMessage.includes(this.cropDatabase[crop].name_english.toLowerCase())
        );
        
        if (mentionedCrop) {
            return this.getCropInformation(mentionedCrop, language);
        }
        
        // Default response
        return this.getRandomResponse(`default_${language}`);
    }
    
    getCropInformation(cropKey, language) {
        const crop = this.cropDatabase[cropKey];
        
        if (language === 'hindi') {
            return `${crop.name_hindi} की खेती के बारे में:\n\n` +
                   `💰 निवेश: ₹${crop.initial_investment.toLocaleString('en-IN')}\n` +
                   `📈 ROI: ${crop.roi_percent}%\n` +
                   `🌱 फसल का समय: ${crop.harvest_time_months} महीने\n` +
                   `💧 पानी की आवश्यकता: ${this.translateWaterRequirement(crop.water_requirement, 'hindi')}\n` +
                   `🏛️ सब्सिडी: ${crop.government_subsidy.scheme} से ${crop.government_subsidy.percentage}% तक\n\n` +
                   `अधिक जानकारी के लिए AI रेकमेंडेशन टूल का उपयोग करें।`;
        } else {
            return `Information about ${crop.name_english}:\n\n` +
                   `💰 Investment: ₹${crop.initial_investment.toLocaleString('en-IN')}\n` +
                   `📈 ROI: ${crop.roi_percent}%\n` +
                   `🌱 Harvest Time: ${crop.harvest_time_months} months\n` +
                   `💧 Water Requirement: ${crop.water_requirement}\n` +
                   `🏛️ Subsidy: Up to ${crop.government_subsidy.percentage}% under ${crop.government_subsidy.scheme}\n\n` +
                   `Use our AI Recommendation Tool for detailed analysis.`;
        }
    }
    
    translateWaterRequirement(requirement, language) {
        const translations = {
            'very_low': { hindi: 'बहुत कम', english: 'Very Low' },
            'low': { hindi: 'कम', english: 'Low' },
            'medium': { hindi: 'मध्यम', english: 'Medium' },
            'high': { hindi: 'ज्यादा', english: 'High' },
            'very_high': { hindi: 'बहुत ज्यादा', english: 'Very High' }
        };
        
        return translations[requirement]?.[language] || requirement;
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses ? responses[Math.floor(Math.random() * responses.length)] : 'Sorry, I didn\'t understand that.';
    }
    
    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = message;
        
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Store in chat history
        this.chatHistory.push({
            message: message,
            sender: sender,
            timestamp: new Date().toISOString()
        });
    }
    
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-message bot';
        typingDiv.innerHTML = `
            <div class="message-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        // Add CSS for typing animation if not exists
        if (!document.querySelector('style[data-typing-animation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-typing-animation', 'true');
            style.textContent = `
                .typing-dots {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                }
                
                .typing-dots span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #666;
                    animation: typing 1.4s infinite ease-in-out;
                }
                
                .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
                .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
                .typing-dots span:nth-child(3) { animation-delay: 0s; }
                
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // =====================================
    // EVENT LISTENERS
    // =====================================
    
    setupEventListeners() {
        // AI Recommendation Button
        const aiRecommendationBtn = document.getElementById('get-ai-recommendation');
        if (aiRecommendationBtn) {
            aiRecommendationBtn.addEventListener('click', () => this.handleAIRecommendation());
        }
        
        console.log('🎯 AI Event listeners setup complete');
    }
    
    async handleAIRecommendation() {
        try {
            // Show loading state
            const button = document.getElementById('get-ai-recommendation');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Analyzing...';
            button.disabled = true;
            
            // Collect farmer data
            const farmerData = this.collectFarmerData();
            
            // Generate recommendations
            const aiResult = await this.generateRecommendation(farmerData);
            
            // Display results
            this.displayAIResults(aiResult);
            
            // Restore button
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show success message
            const message = currentLanguage === 'hindi' 
                ? 'AI सुझाव तैयार है! नीचे देखें।'
                : 'AI recommendations ready! Check below.';
            
            if (typeof showToast === 'function') {
                showToast(message, 'success');
            }
            
        } catch (error) {
            console.error('AI Recommendation Error:', error);
            
            // Restore button
            const button = document.getElementById('get-ai-recommendation');
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show error message
            const message = currentLanguage === 'hindi' 
                ? 'कुछ गलती हुई। कृपया दोबारा कोशिश करें।'
                : 'Something went wrong. Please try again.';
            
            if (typeof showToast === 'function') {
                showToast(message, 'error');
            }
        }
    }
    
    collectFarmerData() {
        return {
            investment: parseInt(document.getElementById('investment-slider')?.value) || 50000,
            timeHorizon: parseInt(document.getElementById('time-horizon')?.value) || 3,
            categories: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value),
            state: document.getElementById('farmer-state')?.value || 'UP',
            farmSize: document.getElementById('farm-size')?.value || 'medium',
            language: currentLanguage
        };
    }
    
    displayAIResults(aiResult) {
        const resultsDiv = document.getElementById('ai-results');
        const recommendationsDiv = document.getElementById('top-recommendations');
        const subsidyList = document.getElementById('subsidy-list');
        
        if (!resultsDiv || !recommendationsDiv) return;
        
        // Show results section
        resultsDiv.classList.remove('hidden');
        
        // Display top recommendations
        recommendationsDiv.innerHTML = '';
        aiResult.recommendations.forEach((crop, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card bg-green-50 border border-green-200 rounded-lg p-4';
            
            card.innerHTML = `
                <div class="text-center">
                    <div class="text-4xl mb-2">${this.getCropEmoji(crop.crop_id)}</div>
                    <h4 class="font-bold text-lg text-green-800 mb-2">
                        ${currentLanguage === 'hindi' ? crop.name_hindi : crop.name_english}
                    </h4>
                    <div class="roi-badge bg-green-600 text-white px-3 py-1 rounded-full text-2xl font-bold mb-2">
                        ${crop.roi_percent}% ROI
                    </div>
                    <div class="text-sm text-gray-600 space-y-1">
                        <div>
                            <span class="font-medium">
                                ${currentLanguage === 'hindi' ? 'निवेश:' : 'Investment:'}
                            </span> 
                            ₹${(crop.initial_investment / 1000)}K
                        </div>
                        <div>
                            <span class="font-medium">
                                ${currentLanguage === 'hindi' ? 'वार्षिक मुनाफा:' : 'Annual Profit:'}
                            </span> 
                            ₹${(crop.net_profit / 100000)}L
                        </div>
                        <div>
                            <span class="font-medium">
                                ${currentLanguage === 'hindi' ? 'फसल काल:' : 'Harvest Time:'}
                            </span> 
                            ${crop.harvest_time_months} 
                            ${currentLanguage === 'hindi' ? 'महीने' : 'months'}
                        </div>
                        <div class="mt-2 bg-yellow-100 p-2 rounded text-xs">
                            <strong>
                                ${currentLanguage === 'hindi' ? 'AI स्कोर:' : 'AI Score:'}
                            </strong> 
                            ${(crop.ai_score * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            `;
            
            recommendationsDiv.appendChild(card);
        });
        
        // Display subsidies
        if (subsidyList && aiResult.subsidies.length > 0) {
            subsidyList.innerHTML = '';
            aiResult.subsidies.forEach(subsidy => {
                const li = document.createElement('li');
                li.className = 'flex items-center space-x-2';
                li.innerHTML = `
                    <i class="fas fa-check-circle text-green-600"></i>
                    <span>
                        <strong>${subsidy.crop}:</strong> 
                        ${subsidy.scheme} - ${subsidy.percentage}% 
                        (${currentLanguage === 'hindi' ? 'अधिकतम' : 'Max'} ₹${subsidy.eligible_amount.toLocaleString('en-IN')})
                    </span>
                `;
                subsidyList.appendChild(li);
            });
        }
        
        // Update wealth projection
        this.updateWealthProjectionDisplay(aiResult.wealthProjection);
        
        // Update chart if available
        if (typeof Chart !== 'undefined') {
            this.updateWealthChart(aiResult.wealthProjection);
        }
    }
    
    updateWealthProjectionDisplay(projection) {
        const year3Element = document.getElementById('year3-wealth');
        const year5Element = document.getElementById('year5-wealth');
        const year10Element = document.getElementById('year10-wealth');
        
        if (projection.length > 3 && year3Element) {
            year3Element.textContent = `₹${(projection[3].cumulative_wealth / 100000).toFixed(1)}L`;
        }
        
        if (projection.length > 5 && year5Element) {
            year5Element.textContent = `₹${(projection[5].cumulative_wealth / 100000).toFixed(1)}L`;
        }
        
        if (projection.length > 10 && year10Element) {
            const value = projection[10].cumulative_wealth;
            if (value >= 10000000) {
                year10Element.textContent = `₹${(value / 10000000).toFixed(1)}Cr`;
            } else {
                year10Element.textContent = `₹${(value / 100000).toFixed(1)}L`;
            }
        }
    }
    
    updateWealthChart(projection) {
        const canvas = document.getElementById('wealth-projection-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Clear existing chart
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        const labels = projection.map(p => `Year ${p.year}`);
        const data = projection.map(p => (p.cumulative_wealth / 100000).toFixed(1));
        
        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: currentLanguage === 'hindi' ? 'संपत्ति मूल्य (₹ लाख)' : 'Wealth Value (₹ Lakhs)',
                    data: data,
                    borderColor: 'rgb(22, 163, 74)',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgb(22, 163, 74)',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: currentLanguage === 'hindi' ? 'आपका वेल्थ प्रोजेक्शन' : 'Your Wealth Projection',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y} Lakhs`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: currentLanguage === 'hindi' ? 'मूल्य (₹ लाख)' : 'Value (₹ Lakhs)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }
    
    getCropEmoji(cropId) {
        const emojis = {
            'ashwagandha': '🌿',
            'bamboo': '🎋',
            'dragon_fruit': '🐉',
            'strawberry': '🍓',
            'aloe_vera': '🌵',
            'tulsi': '🌱',
            'mint': '🍃'
        };
        return emojis[cropId] || '🌾';
    }
    
    // =====================================
    // UTILITY METHODS
    // =====================================
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    formatCurrency(amount) {
        return `₹${amount.toLocaleString('en-IN')}`;
    }
    
    // =====================================
    // API INTEGRATION METHODS (Future)
    // =====================================
    
    async fetchWeatherData(location) {
        // Mock weather API call
        return {
            temperature: 28,
            humidity: 65,
            rainfall: 25,
            windSpeed: 12
        };
    }
    
    async fetchSoilData(location) {
        // Mock soil API call
        return {
            ph: 7.2,
            nitrogen: 45,
            phosphorus: 38,
            potassium: 42,
            organicMatter: 3.8
        };
    }
    
    async fetchMarketPrices() {
        // Mock market API call
        return {
            ashwagandha: { price: 1200, trend: 'up' },
            bamboo: { price: 8000, trend: 'up' },
            dragon_fruit: { price: 350, trend: 'stable' }
        };
    }
}

// Initialize AI Engine
let krishiMitraAI;

document.addEventListener('DOMContentLoaded', function() {
    krishiMitraAI = new KrishiMitraAI();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KrishiMitraAI;
}

// Global access
window.KrishiMitraAI = KrishiMitraAI;