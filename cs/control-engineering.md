# Control Engineering																									
																									
		category																							
			力制御																						
			PID制御																						
			ロバスト制御																						
			ビジュアルサーボ																						
			適応制御																						
			位置制御																						
			非干渉制御																						
			ファジィ制御																						
			フィードバック制御																						
																									
																									
			RRT; rapid-exploring random tree																						
																									
																									
																									
																									
																									
																									
			カルマンフィルタ																						
			拡張カルマンフィルタ																						
																									
		interpolation																							
			スプライン補間																						
			円弧補間																						
			直線補間																						
			２次関数補間																						
			cos補間																						
			sigmoid補間																						
																									
																									
																									
																									
																									
																									
		glossary																							
			ラプラス変換																						
			伝達関数																						
			周波数応答																						
			時間応答																						
																									
																									
			特性																						
				ゲイン特性																					
				位相特性																					
				過渡特性																					
				定常特性																					
																									
			用途例																						
				電気回路系																					
					RC並列回路																				
					RC直列回路																				
					RL直列回路																				
					コンデンサ																				
					DCモータ系																				
				水位系																					
				機械振動系																					
				熱系																					
				ばねダンパ系																					
				自励系																					
																									
			要素																						
			比例要素																						
			微分要素																						
			積分要素																						
			位相進み要素																						
			直列結合要素																						
			オーバーシュートする要素																						
			１次遅れ要素																						
			２次遅れ要素																						
			３次遅れ要素																						
			むだ時間要素																						
			逆応答する要素																						
																									
			特性方程式																						
																									
			ステップ応答																						
			インパルス応答																						
																									
			ゲイン余裕																						
																									
			扱う関数																						
			正弦波関数																						
			ランプ関数																						
																									
			ループ制御系																						
			閉ループ系制御系																						
				負帰還を使う																					
			開ループ制御系																						
				負帰還を使わない																					
																									
																									
			定理																						
			初期値の定理																						
			最終値の定理																						
			推移定理																						
				時間領域																					
				複素領域																					
																									
			安定判別法																						
			ラウス・フルビッツの安定判別法																						
			ナイキストの安定判別法																						
			リアプノフの安定判別法																						
																									
			漸近安定																						
			漸近安定な行列																						
																									
			軌跡																						
			ベクトル軌跡																						
			根軌跡法																						
																									
			schema																						
			ニコルス線図																						
			ボード線図																						
																									
		古典制御																							
			disadvantage																						
				多入力多出力を扱えない																					
																									
																									
																									
			category																						
				P制御																					
				PI制御																					
																									
				PID制御																					
					一番良く使われる																				
																									
					Proportional: 比例																				
					Integral: 積分																				
					Differential: 微分																				
																									
					Kp, Ki, Kdを試行錯誤的に調整して制御する																				
																									
				変化形																					
					比例微分先行型PID制御(I-PD制御)																				
					二自由度PID制御																				
																									
																									
																									
		現代制御：1960年代																							
			advantage																						
				多入力多出力を扱える																					
			category																						
				状態フィードバック制御																					
																									
																									
				線形最適制御：LQR																					
					モデル予測制御よりも設計が簡単																				
				LQR																					
					LQIの拡張																				
																									
			glossary																						
			状態方程式																						
			状態遷移行列																						
																									
			システムの性質																						
				可制御性																					
					flow																				
						座標変換行列Tは無数に選べる																			
						そこで、Tとして対角正準系を選ぶ																			
				可観測性																					
					可観測性行列が正則なら、可観測である																				
			双対性																						
				２つのシステム																					
					Σ1																				
					Σ2																				
				が、可制御性と可観測性において双対である条件は																					
					Σ1の可制御性行列と　Σ2の可観測性行列のランクが等価である																				
					Σ1の可観測性行列と　Σ1の可制御性行列のランクが等価である																				
																									
			制御性設計																						
				状態変数が直接観測可能な場合																					
					平衡点からずれた初期値があったとき、状態変数をゼロに整定させるレギュレータを構成する方法																				
						disadvantage																			
							定常的な外乱が加わった時にゼロに整定できない																		
							目標値に対して制御量が定常偏差なく追従するようなサーボ系も扱えない																		
																									
						分類																			
							極配置法																		
							手法																		
								直接法による極配置																	
								可制御正準系による極配置																	
								アッカーマン法による極配置																	
							disadvantage																		
								極度に大きな操作量を要求する可能性がある																	
								パラメータ変化に敏感																	
																									
							最適レギュレータ																		
							極配置法のデメリットを解決するため、２次形式評価関数を使う																		
								この関数を最小にすることを目指す（最適化）																	
									リカッチ方程式を解く																
							折り返し法																		
																									
					サーボ系に対する方法																				
						内部モデル原理																			
							外部入力信号の特性と同じ特性を持つモデルを制御装置に設けておくと、																		
							どんな入力信号が来ても定常偏差をゼロにすることができる。																		
							例																		
								目標値がランプ状に変化する場合、もしくはランプ上の外乱が印加される場合																	
									前置補償器に積分器を2つ設ければ解決できる																
								パラボラ状の場合																	
									積分器を３つ設ければ解決できる																
						内部モデル原理を活かしたサーボ系設計手法																			
							順序																		
							拡大系（本来の系に積分器を追加したもの）を構成する																		
							拡大系の可制御性を確認する																		
							極配置法・最適レギュレータ・折り返し法によって制御定数F_barを算出する																		
																									
																									
																									
																									
																									
				状態変数が直接には観測不能な場合：状態観測器を使う																					
					「検出可能な操作量」「出力」から状態を再現する機構のこと。																				
					再現された状態について状態フィードバックする																				
																									
					双対性を用いた状態観測器の設計																				
																									
																									
		未分類																							
			遺伝的アルゴリズムによる制御																						
			リカッチ方程式																						
																									
			補償器																						
			前置補償器																						
			PID補償器																						
			madgewick filter																						
			MPC: model predictive control																						
																									
			ルンゲクッタ法																						
				状態方程式の時間応答の近似解を求める方法																					
																									
			状態方程式																						
			状態空間																						
			オブザーバ																						
																									
																									
																									
			リアプノフ関数																						
				説明																					
					常微分方程式における不動点の安定性を証明するのに用いる																				
				用途																					
					制御における安定																				
					マルコフ連鎖における一般状態空間（この場合、特にリアプノフ・フォスター関数と呼ばれる）																				
																									
				平衡点の種類																					
					リアプノフ安定																				
					漸近安定																				
					大局的に漸近安定																				
																									
																									
			システム同定																						
				対象システムを表現するモデルを構築すること																					
																									
				モデル																					
					ホワイトボックスモデル																				
						運動方程式や回路方程式などで、対象の振る舞いが完全に既知である場合																			
					グレーボックスモデル																				
						未知な部分がある																			
					ブラックボックスモデル																				
						完全に未知																			
						このような場合に、入出力からモデルを推定することをシステム同定という																			
																									
				同定入力																					
					同定のために投入する入力																				
																									
					選定方法																				
						振幅特性																			
																									
																									
						周波数特性																			
																									
																									
			飛行機における制御対象																						
				制御したい量																					
					roll																				
					pitch																				
					yaw																				
					velocity																				
				制御入力																					
					エンジン出力、エレベータ、エルロン、ラダー																				
																									
制御																									
		自立分散システム																							
		適応制御																							
		非線形制御																							
		ファジィ制御																							
		シーケンス制御																							
		コンプライアンス制御																							
		ベクトル制御																							
		位置制御																							
		トルク制御																							
		速度制御																							
																									
		周波数制御																							
		割り込み制御								