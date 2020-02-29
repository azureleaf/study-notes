## Computer Vision
#misc									
		misc							
			Semantic Gap	画像の見た目と意味との乖離					
			SIFT						
			Bag of Visual Words	Process local features as if they are words You can use NLP approach to CV					
									
			Caltech 101	Image Data Collection, 2004					
			ImageNet	Image Data Collection, 2009					
			ILSVRC	CV Competition					
									
			Sampling						
			Dense Sampling	Find features in the every small blocks in the image					
			Sparse Sampling	Find features(such as edge, corner) in the entire image					
									
			Feature / Key Point						
			Geometric Invariance 	幾何学的不変性。 Not being affected by rotation/magnification/contrast Good features has this invariance					
			Repeatability of feature						
			Robustness of feature						
			Invariance of feature						
			Distinctiveness of feature						
									
			Detection	Finding feature					
			Description	Describe the region around feature					
									
			Global Feature　大域特徴	Feature in the entire image e.g. edge of the box in the pic					
			Local Feature　局所特徴	Feature in the region of the image e.g. edge of the characters printed on the box					
									
			Detector	Finds features					
			Edge Detector						
			Corner Detector						
			Blob Detector						
			Blob						
									
			Spatial Filtering						
			Linear Spatial Filtering						
			Non-linear Spatial Filtering						
			Average Filter						
			Gaussian Filter						
			Bilateral Filter						
									
			Sobel Filter						
									
		Edge Detection							
			Edge Detection by 1st Derivation	一次微分によるエッジ検出					
			Edge Detection by 2nd Derivation	二次微分によるエッジ検出					
			Prewitt Filter	by 1st Derivation					
			Canny Edge Detector	by 1st Derivation Gaussian Filtering + Sobel Filtering					
			LoG: Laplacian of Gaussian Filter	by 2nd Derivation					
			Laplacian						
			zero-crossing Point						
									
		Corner Detection							
			Hessian Corner Detector						
			Moravec Corner Detector						
			Harris Corner Detector						
			Fast Corner Detector						
			USAN: Univalue Segment Assimilating Nucleus						
			SUSAN: Smallest USAN						
			Segment Test						
									
									
		misc							
			Local Descriptor						
			Image Patch						
			Statistical Feature Extraction						
			Coding						
			Pooling						
			Image Feature Vector						
			Classification						
			Classifier						
									
			Parametric						
			Non-parametric						
									
			Deep Architecture						
			Shallow Architecture						
									
			Positive Data						
			Negative Data						
			Hard Negative						
									
			Objectness						
			Sliding Window Method						
									
									
									
									
	Tasks								
			Object Recognition						
			Instance Recognition	Obj Recognition e.g. Specify Golden Gate Bridge, not just the general bridge					
			Class Recognition	Obj Recognition Related to Similar Image Search					
			Fine-Grained Obj Recognition	Obj Recognition e.g. Specify dog breeds					
									
			Similar Image Search						
			Image Annotation						
			Image Caption Generation						
			Scene Recognition						
			Object Detection	Not just categorize obj, but also find its rectangular-shape area in the image					
			Semantic Segmentation	Specify the arbitrary-shape area in the image					
			Instance Segmentation	Separate identical obj even when they're visually overwrapped					
			Video Recognition						
			Image Generation						
									
									
									
									
	Class Recognition Procedure								
		1	Sampling						
		2	Local Description						
		3	Statistical Feature Extraction						
		4	Coding						
		5	Pooling						
		6	Classification						
									
	Object Detection Procedure								
		1	Extract the candidates of obj region						
		2	Calculate "objectness" in every candidate						
		3							
		4							
		5							
									
	Instance Recogition Procedure								
		1							
		2							
		4							
		5							
		6							
									
									
									
MLP-IR									
	list								
		1	座標系						
									
		2	カメラ						
			画像生成						
									
		3	画像情報						
									
		4	画素単位での処理：濃淡変換						
			利点						
				画像全体を見やすくし、暗すぎ明るすぎでつぶれている部分を見やすくする					
				非線形な変換な場合、事前知識なしには復元不能になる					
			分類						
				トーンカーブによる変換					
					トーンカーブを与える関数を、階調変換関数 gray-level transformation functionと呼ぶ				
									
					形状				
						階段状のトーンカーブ（カーブじゃないが）			
							posterizationになる		
								特に２段階のとき、二値化 binarizationと呼ぶ	
									
						直線型トーンカーブ			
							原点などを通らない直線だと、一部がつぶれる		
							y=-xのカーブを使うと、ネガポジ反転		
						折れ線型トーンカーブ			
						S字型トーンカーブ			
						累乗型トーンカーブ（ガンマ補正）			
							利点		
								折れ線型のように、一部の画素強度を境に急激に変化するのを防ぐ	
							γ＝１のとき、変化しない		
							γが１からずれるときは、トーンカーブは上や下へのふくらみとなる		
						サインカーブみたいなトーンカーブ			
							Solarization		
								ネガとポジが合わさったような特殊な効果	
									
					対象画像				
						白黒			
							グレースケールに対して、RGBトーンカーブを処理		
								擬似カラー	
									e.g. 赤外線画像の色つけ
						カラー			
							RGBのチャネルごとに異なるトーンカーブ処理		
							RGBの全チャネルで同じトーンカーブ処理		
									
									
									
				ヒストグラムによる変換					
					変換後の分布形状				
						一様分布			
						正規分布			
									
									
									
		5	画像単位での処理：濃淡変換						
									
				空間フィルタリング					
					画素だけでなく、その周囲を含めた計算をすること				
									
					線形フィルタ				
					非線形フィルタ				
									
				平滑化処理					
					平均化フィルタ averaging filter				
						フィルタのサイズが大きいほど、当然ぼやける			
									
					加重平均化フィルタ weighted averaging filter				
						フィルタの原点（普通は中央）に近いほど大きな重みを付けるフィルタ			
						平均化フィルタほどにはぼやけないが、微視的には平滑化されている			
							重みの付け方		
								正規分布	
					特定方向への平滑化				
									
				エッジ抽出					
					微分フィルタ				
						単純な微分フィルタ			
						Prewitt Filter			
						Sobel Filter			
						Second Derivative Filter	２次微分フィルタ		
						Laplacian Filter			
									
				鮮鋭化					
									
									
									
		6	画像単位での処理：周波数						
									
				目的					
					chap 10 で用いる				
									
		7	復元：汚い2D→きれいな2D						
				目的	見栄え				
					chapter 9, 10, 11, 12, 13の前処理				
									
		8	幾何学変換						
				目的	画像の変形				
					補間による高精度化				
					画像合成				
					特徴点抽出				
									
		9	2値画像処理						
				目的	輪郭抽出				
					２値しか使えない処理のための前処理				
						例	印刷		
					データ量圧縮				
		10	領域処理						
				目的					
					テクスチャによって、画像分類を助ける				
					欲しいところだけ切り出す				
					輪郭抽出				
		11	パターン検出（力技）						
		12	パターン検出（機械学習）						
									
									
									
		13	動画像処理						
			目的						
				移動物体の検出/追跡					
				カット情報の検出					
				カメラの動きの検出					
				3次元情報の復元					
					物体				
					物体の背景環境				
				見栄え					
			分類						
				差分画像を用いる方法					
					背景差分法				
						手順			
							移動物体がない状態を撮影する		
							移動物体が入った画像との差分をとる		
								移動物体の領域が０以外の値となる	
							差分画像にしきい値処理を行い、２値画像とする		
							２値画像にクロージングとオープニングで余計なものを除去		
					フレーム間差分法				
						移動物体がない画像が得られないとき。			
				optical flowによる方法					
					block matching法				
					勾配法				
						Lucas Kanadeの方法			
						Horn Shunckの方法			
				template matchingによる方法					
					KLT Tracker				
									
					Mean Shift Tracking				
									
					Beysean Filter				
						Kalman Filter			
						Particle Filter			
									
									
		14	復元：2D→3D（フレーム間差分）						
				目的	３次元情報の復元				
						物体			
						カメラ			
					最適な投光方法の選択				
		15	復元:2D→3D (反射情報）						
				目的	見栄え				
					輪郭抽出・パターン検出の前処理				
					３次元情報の復元				
						物体			
						光源			
					反射なし画像に自然な光源処理を与える				
		16	画像の符号化						
				目的	データ量圧縮				
									
	目的別の章								
		画像の強調・平滑化							
			4	5	6	8			
									
		鮮明にする							
			7	5	8				
									
		輪郭抽出							
			5	10	9	11			
		pattern match							
			11	12	8				
		３次元の復元							
			13	14	15				
									
									
1-1.	座標系								
		数学的な座標系							
			x軸が右方向, y軸が上方向						
									
									
									
									
misc									
	all the cv researcher wanna solve Semantic Gap								
		discrepancy between							
			Appearance of the image						
			Semantic Context of the image						
									
Procedure of Class Recognition									
	1 sampling								
		sparse sampling							
			finding edge & corner with detector						
		dense sampling							
			finding the feature in every small region						
	2 local description　局所記述								
		set Image Patch around the feature point							
		get Local Descriptor from the patch							
			局所記述の例						
				画素値をそのまままとめたもの					
				パッチ内の輝度勾配					
									
		局所特徴							
			画像中の小領域を表現する特徴量のこと						
									
			検出器と記述子を組み合わせる						
				相性					
					DoG + SIFT				
					Box Filter + SURF				
					FAST + BRISK				
					AGAST + BRISK				
					oFAST + ORB				
									
									
			空間フィルタ  spatial filter						
				エッジやコーナなどの点を抽出するもの					
					実際の物体のエッジやコーナを検出するのではない。あくまで見た目での話。				
				特徴点は、keypointとも呼ばれる					
									
				線形性による分類					
					線形空間フィルタ				
						出力画素の値が、入力画素の近傍の画素値の線形結合になるもの			
									
						計算方法			
							相関		
							畳み込み		
					非線形空間フィルタ				
									
				subcategory					
					Averaging Filter 平均化フィルタ				
									
					Gaussian Filter				
									
					Bilateral Filter				
									
			検出器						
				エッジ検出器					
					１次微分による検出				
						微分フィルタ			
						微分フィルタ＋平滑化（Prewitt FIlter）			
						微分フィルタ＋中央に重みをつけた平滑化（Sobel Filter）			
					２次微分による検出				
						Laplacian of Gaussian Filter (LoG)			
				コーナ検出器					
					微分を用いる手法				
						Hessian corner detector			
						Moravec Corner Detector			
						Harris Corner Detector			
					微分を用いない手法				
						SUSAN			
						Segment Test			
						FAST corner detector			
									
				ブロブ検出器					
					blobとは、周囲とは状況が異なる小領域のこと				
									
					subcategory				
						LoG filter			
						ガウシアンフィルタの差分 Difference of Gaussian: DoG			
						ヘシアンの行列式を用いた検出器			
									
									
				検出器をどうすれば頑健にするか					
					回転に頑健				
									
					アフィン変形に頑健				
									
									
			記述子 descriptor						
				局所領域の内容を認識に有利な情報に変換する作業を記述という					
									
				subcategory					
					局所輝度勾配を使わないもの				
						Raw Pixel Descriptor 画素記述子			
						Local Binary Pattern			
						Binary Local Descriptor			
							Brief Descriptor		
							rBRIEF descriptor		
							BRISK descriptor		
						HLAC:　高次局所自己相関			
						GIST descriptor			
						CNNを用いたdescriptor			
									
					局所輝度勾配を使うもの				
						SIFT descriptor			
						HOG descriptor			
						SURF descriptor			
	3 Statistical Feature Extraction 統計的特徴抽出 (MLP-IR-chap3)								
		局所特徴の確率統計的な構造（ノイズの乗り方とか）にもとづいて処理する							
		これにより、より有効な特徴量とすること							
									
		method							
									
			主成分分析 PCA, aka KL展開: Karhumnen Loeve Expansion						
									
			白色化　Whitening						
			Fisher LDA　フィッシャー線形判別分析						
			CCA: Canonical Correlation Analysis 正準相関分析						
			PLS: Partial Least Squares: 偏最小二乗法						
									
	4   Coding (MLP-IR-chap4)								
		局所特徴を、認識に有効な一定の次元数の特徴ベクトルに変更する操作のこと							
									
		コーディング関数の求め方							
			A　「仮定：データがある確率分布からサンプリングされている」として、確率分布から推定する						
			B   代表点を利用してデータを再構築することで推定する						
			C   特徴空間においてデータがなす多様体を、複数の代表点を用いて推定する						
			D   データの類似度を表す関数を、特徴写像の線形な遺跡として近似することで推定する						
			E　畳み込み演算のカーネルを判別的に学習することで推定する						
									
		method							
			ベクトル量子化？						
									
									
	5   Pooling (MLP-IR-chap4)								
		ある画像領域から得られた特徴ベクトル群を、一本のベクトルにまとめる操作							
			CNNの「プーリング層」のプーリング						
			一本のベクトル、は１次元のベクトルという意味ではない（プーリング層の出力は１次元じゃない）						
	6   Classification 分類 (MLPIR-chap5)								
									
	chapter 5 分類								
	chapter 5 CNN								
		these 2 chapters aren't new for me							
									
	物体検出								
		goal							
			set Bounding Box, aka Window, on the object						
		procedure							
			find the candidate of the bounding area						
			check if the bounded area is the target by Object Class Recogtion						
			prevent the multiple bounding for the identical object						
									
									
		物体検出候補の提案							
			スライディングウィンドウ法						
			選択的検索法						
			分枝限定法						
									
		線形分類器による：							
			HOG特徴と線形SVMによる						
			DPM：物体の変形を考慮した手法						
			Latent SVM 分類困難な負例の活用						
			Exemplar-SVM						
		集団学習による：							
									
		CNNによる：							
			R-CNN						
			Fast R-CNN						
			Faster R-CNN						
			回帰問題による物体検出						
									
									
		非最大値の抑制							
									
		物体検出の評価							
									
									
	インスタンス認識								
		BoVW							
		局所特徴量の空間的関係を考慮した検証							
		質問拡張							
		データベースにおける画像の特徴ベクトルの拡張							
		効率的なベクトル量子化							
									
	Similar Image Search, aka Image Retrieval								
		goal							
			give feature vector of x, find the similar image in the database						
		method							
			using 木構造						
				kd-tree					
			using Binary Code						
									
			using 直積量子化						
									
		画像検索の評価							
									
	画像からのキャプション生成								
		neural image caption							
		LSTM							
									
	semantic segmentation								
		encoder-decoder network							
		SegNet							
									
	GAN								
		DCGAN							
									
*******************									
画像全体の処理									
	マンセルの色立体								
		彩度							
		明度							
		色相							
	コントラスト								
		トーンカーブを用いて変換する							
			直線						
				ネガポジ反転					
									
			折れ線						
									
									
									
			曲線						
									
		ヒストグラム平均化							
									
									
	エッジ検出								
									
									
									
									
	フィルタリング								
		平均化処理							
		Cannyのアルゴリズム							
		パスフィルタ							
			ハイパスフィルタ						
			ローパスフィルタ						
			バンドパスフィルタ						
									
									
	パターンマッチング								
									
CV with ML									
	face recognition								
		Harr-like features							
		Cascaded Classifier							
									
		eigenface							
		deep face							
		bunch graph matching							
									
		dlib (library)							
									
	hand writing recognition								
	OCR								
									
									
	特徴点の抽出								
		スケール・回転に対して不変な抽出							
			SIFT						
			SURF						
			ORB: Oriented BRIEF						
				SURFの１０倍、SIFTの１００倍高速					
			KAZE						
			AKAZE						
									
									
		FAST							
			注目画素周囲の16個のピクセルを用いる						
			決定木により、特徴量かどうか調べる						
									
									
		Shi-tomasi スコア							
			コーナー検出に用いる						
									
	optical flow								
									
									
	segmentation								
		semantic segmentation							
									
			semantic texton forests						
				http://mi.eng.cam.ac.uk/~cipolla/publications/inproceedings/2008-CVPR-semantic-texton-forests.pdf					
			random forest 分類器						
				http://www.cse.chalmers.se/edu/year/2011/course/TDA361/Advanced%20Computer%20Graphics/BodyPartRecognition.pdf					
			semantic instance segmentation						
									
				Fully Convolutional Networks					
									
			patch 分類						
				http://people.idsia.ch/~juergen/nips2012.pdf					
									
			FCN: by UC Berkely Long						
									
									
									
									
									
		unsupervised segmentation							
									
									
			union-find						
			watershed (region growing)						
			大津の二値化法						
			snake (active contour)						
				3次元曲面へも拡張できる					
			graph cuts						
			mean shift						
									
									
	Radon変換								
	HOG特徴量								
		局所領域 (セル) の輝度の勾配方向をヒストグラム化したものです。							
		問題点							
			次元の呪い						
									
	labeling the image								
	position tracking								
	pose estimation								
	３次元復元								
									
		エピポーラー幾何とは、２つのカメラで同じ３次元物体を異なる視点から撮影したときに生じる幾何のことです。							
			エピポーラ平面						
			、エピポーラ線						
			エピポール、基礎行列,そして基本行列						
									
		SfM: structure from motion							
			purpose						
				複数の2d画像から点群へ					
			library						
				openMVG					
				bundler by Cornell university					
				openCV sfm module					
				visualSFM					
		multi-view stereo							
			purpose						
				点群からさらに密な点群へ					
			library						
				openMVS					
				PMVS					
									
	画像修復								
									
	画像合成								
	白黒写真着色								
	高解像度化								
	手ぶれ補正								
	SLAM								
	PTAM：Parallel Tracking and Mapping for Small AR Workspaces								
		マーカー無しのAR							
									
									
history									
	1999								
		SIFT Feature							
	2003								
		Bag of VIsual Words Feature							
			局所特徴量を単語のように扱う						
			advantage						
				画像認識の問題を、NLPの問題として捉えることができる					
	2004								
		Caltech101 dataset							
	2009								
		ImageNet dataset							
	2010								
		ILSVRC contest							
									
									
									
									
									
#image format									
									
	JPEG								
									
	PNG								
									
	TIFF								
									
	Raster Image / Bitmap Image								
		Dot Matrix Data Structure							
